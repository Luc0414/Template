import { ContextAPI } from "@/context/translation";
import { memoize } from "lodash";
import { PageMeta } from "./types";

// 默认的页面元数据
export const DEFAULT_META: PageMeta = {
    title: 'PancakeSwap',
    description:
      'description Test ',
    image: `https://psstatic.cdn.bcebos.com/video/wiseindex/aa6eef91f8b5b1a33b454c401_1660835115000.png`,
  }


// 页面路径列表类型
interface PathList {
  paths: {
    [path: string]: {
      title: string;
      basePath?: boolean;
      description?: string;
      image?: string;
    };
  };
  defaultTitleSuffix: string;
}

// 获取页面路径列表
const getPathList = (t: ContextAPI["t"]): PathList => {
  return {
    paths: {
      "/": { title: t("Home"),description:t("Home description") },
    },
    defaultTitleSuffix:t('PancakeSwap')
  };
};

// 获取特定页面的自定义元数据，使用 lodash.memoize 进行性能优化
export const getCustomMeta = memoize(
  (path: string, t: ContextAPI["t"], _: string): PageMeta => {
    const pathlist = getPathList(t)
    const pathMetadata = pathlist.paths[path] ??
    pathlist.paths[Object.entries(pathlist.paths).find(([url,data])=> data.basePath && path.startsWith(url))?.[0]]

    if(pathMetadata){
        return {
            title:`${pathMetadata.title}`,
            ...(pathMetadata.description && {description:pathMetadata.description}),
            ...(pathMetadata.image &&{image:pathMetadata.image})
        }
    }
    return null;
  },
  // memoize 的 key 为 path#locale，如果 path 和 locale 没有变化，则直接返回上次的计算结果
  (path,t,locale) => `${path}#${locale}`
);
export {};
