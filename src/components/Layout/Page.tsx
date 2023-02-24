import { DEFAULT_META, getCustomMeta } from "@/config/constants/meta";
import useTranslation from "@/hooks/useTranslation";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import Container from "./Container";

const StyledPage = styled(Container)``;
export const PageMeta: React.FC<React.PropsWithChildren> = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation();
  const { pathname } = useRouter();

  const pageMeta = getCustomMeta(pathname, t, locale);

  if (!pageMeta) {
    return null;
  }
  // 忽略值为undefined的数据
  const newPageMeta = Object.entries(pageMeta).reduce((acc,[key,vaule]) => {
    if(vaule !== undefined){
        acc[key] = vaule
    }
    return acc
  })

  const { description, image } = { ...DEFAULT_META, ...newPageMeta };
  console.log(image)
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
