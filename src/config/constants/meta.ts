import { ContextAPI } from "@/context/translation";
import { memoize } from "lodash";
import { PageMeta } from "./types";

export const DEFAULT_META: PageMeta = {
    title: 'PancakeSwap',
    description:
      'description Test ',
    image: `https://psstatic.cdn.bcebos.com/video/wiseindex/aa6eef91f8b5b1a33b454c401_1660835115000.png`,
  }


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

const getPathList = (t: ContextAPI["t"]): PathList => {
  return {
    paths: {
      "/": { title: t("Home"),description:t("Home description") },
    },
    defaultTitleSuffix:t('PancakeSwap')
  };
};
export const getCustomMeta = memoize(
  (path: string, t: ContextAPI["t"], _: string): PageMeta => {
    const pathlist = getPathList(t)
    const pathMetadata = pathlist.paths[path] ??
    pathlist.paths[Object.entries(pathlist.paths).find(([url,data])=> data.basePath && path.startsWith(url))?.[0]]

    if(pathMetadata){
        return {
            title:`${pathMetadata.title}`,
            ...(pathMetadata.description && {description:pathMetadata.description}),
            image:pathMetadata.image
        }
    }
    return null;
  },
  (path,t,locale) => `${path}#${locale}`
);
export {};
