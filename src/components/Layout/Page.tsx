import { DEFAULT_META, getCustomMeta } from "@/config/constants/meta";
import useTranslation from "@/hooks/useTranslation";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "../Box/Box";
import Container from "./Container";

const TabMenuWrapper = styled(Box)`
  
`
const StyledPage = styled(Container)``;

// 定义 PageMeta 组件，用于生成页面的 meta 信息
export const PageMeta: React.FC<React.PropsWithChildren> = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation();

  // 使用 Next.js 路由
  const { pathname } = useRouter();

  // 获取页面的自定义 meta 信息
  const pageMeta = getCustomMeta(pathname, t, locale);

  if (!pageMeta) {
    // 如果没有自定义 meta 信息，则不生成 meta 标签
    return null; 
  }

  // 合并自定义 meta 信息和默认 meta 信息
  const { description, image } = { ...DEFAULT_META, ...pageMeta };

  // 生成 meta 标签，使用 NextSeo 组件
  return (
    <NextSeo
      title={pageMeta.title}
      description={description}
      openGraph={
        image
          ? {
              images: [
                { url: image, alt: pageMeta?.title, type: "image/jpeg" },
              ],
            }
          : undefined
      }
    />
  );
};

// 定义 Page 组件，用于包裹页面内容和 meta 信息
export const Page: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  );
};
