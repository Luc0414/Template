import useLastUpdated from "@/hooks/useLastUpdated";
import { EN, languages } from "@/translation/config/languages";
import {
  fetchLocale,
  getLanguageCodeFromLS,
  LS_KEY,
} from "@/translation/helpers";
import isUndefinedOrNull from "@/utils/isUndefinedOrNull";
import { memoize, omitBy, reduce } from "lodash";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ContextAPI,
  Language,
  ProviderState,
  TranslateFunction,
} from "./types";

// 组件初始化
const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
};

const getRegExpForDataKey = memoize((dataKey: string): RegExp => {
  return new RegExp(`%${dataKey}%`, "g");
});

// 创建翻译的上下文
export const LanguageContext = createContext<ContextAPI | undefined>(undefined);

// 创建一个Map，用于存储不同语言对应的翻译对象
const languageMap = new Map<Language["locale"], Record<string, string>>();
// 向Map中添加一种语言（英语）对应的空的翻译对象
languageMap.set(EN.locale, {});

// 检查是否包含占位符%%
const includesVariableRegex = new RegExp(/%\S+?%/, "gm");

// !!在作用是强制将结果转换成布尔类型
// ?.是可选链运算符，它可以用来访问一个可能为null或undefined的对象属性或方法。如果对象的属性或方法存在，就会返回该属性或方法的值，否则就会返回undefined。
// 判断参数是否包含占位符
const translatedTextIncludesVariable = memoize(
  (translatedText: string): boolean => {
    return !!translatedText?.match(includesVariableRegex);
  }
);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // 获取更新时间和设置更新时间的方法
  const { lastUpdated, setLastUpdated: refresh } = useLastUpdated();

  // 创建一个状态state，初始值是一个函数的返回值
  const [state, setState] = useState<ProviderState>(() => {
    // 从LocalStorage中获取语言代码
    const codeFromStorage = getLanguageCodeFromLS();

    // 如果LocalStorage中没有语言代码，使用默认的英语语言（`EN`）
    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage] || EN,
    };
  });

  // 获取当前使用的语言
  const { currentLanguage } = state;

  // 渲染完成后之后执行
  useEffect(() => {
    const fetchInitialLocales = async () => {

      // 从LocalStorage中获取语言代码
      const codeFromStorage = getLanguageCodeFromLS();
      
      // LocalStorage不等于英语时
      if (codeFromStorage !== EN.locale) {
        // 获取翻译文件
        const currentLocale = await fetchLocale(codeFromStorage);
        // 设置语言映射
        if (currentLocale) {
          languageMap.set(codeFromStorage, currentLocale);
          // 刷新
          refresh();
        }
      }

      // 设置状态为已获取翻译数据
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
    };

    fetchInitialLocales();
  }, [refresh]);

  // useCallback的deps为空时，回调函数之后在首次渲染时被创建并返回，返回的回调函数将一直保持不变
  const setLanguage = useCallback(async (language: Language) => {
    // 更改状态，isFetching正在获取翻译数据
    if (!languageMap.has(language.locale)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }));

      const locale = await fetchLocale(language.locale);

      if (locale) {
        languageMap.set(language.locale, locale);
        localStorage?.setItem(LS_KEY, language.locale);
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
          currentLanguage: language,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
        }));
      }
    } else {
      localStorage?.setItem(LS_KEY, language.locale);
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
    }
  }, []);
  const translate: TranslateFunction = useCallback(
    (key, data) => {
      // 获取指定语言对应的翻译集合
      const translationSet = languageMap.get(currentLanguage.locale) ?? {};
      // 翻译集合中获取对应 key 的翻译文本,如果没有对应的翻译文本则返回 key 本身
      const translatedText = translationSet?.[key] || key;

      if (data) {
        // 判断该翻译文本是否包含变量，如果包含则进行变量替换
        const includesVariable = translatedTextIncludesVariable(key);
        if (includesVariable) {
          // 该函数的作用是对一个集合进行迭代处理，返回一个累加值。第一个参数是要迭代的集合，第二个是迭代函数，第三个参数是初始值。迭代函数接收两个参数，分别是累加值和当前值
          // 对数据进行迭代，将数据中的占位符替换成对应的值
          return reduce(
            // 删除null或undefined的值
            omitBy(data, isUndefinedOrNull),
            // 累加器，value，key
            (result, dataValue, dataKey) => {
              return result.replace(
                getRegExpForDataKey(dataKey),
                dataValue.toString()
              );
            },
            // 初始化的值
            translatedText
          );
        }
      }

      return translatedText;
    },
    [currentLanguage, lastUpdated]
  );
  
  // 接受一个函数和依赖项数组，只有依赖项发生变化时才会重新计算并返回新值，否则会返回上一次缓存的值。
  const providerValue = useMemo(() => {
    return { ...state, setLanguage, t: translate };
  }, [state, setLanguage, translate]);

  return (
    <LanguageContext.Provider value={providerValue}>
      {children}
    </LanguageContext.Provider>
  );
};
