import styled from "styled-components";
import { images } from "../constants/images";
import { memo } from "react";

const HeaderStyle = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;

  picture {
    flex: 1;
    aspect-ratio: 200 / 89;

    img {
      width: 60%;
      height: auto;
      margin: 0 auto;
      display: block;
      border-radius: 20px;
    }
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 90%;

    h1 {
      color: ${({ theme }) => theme.colors.text.heading1};
      text-align: center;

      > span {
        display: block;
        font-size: 20px;
        font-style: italic;
        font-weight: 400;
        margin-top: 10px;
        color: ${({ theme }) => theme.colors.text.subtitle};
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    picture {
      order: 2;

      img {
        width: ${({ $imagePath }) => ($imagePath ? "60%" : "100%")};
      }
    }

    > div {
      order: 1;
      align-items: flex-start;
      max-width: 50%;

      h1 {
        text-align: left;
      }

      > a {
        align-self: center;
      }

      > button {
        align-self: center;
      }
    }
  }
`;

export const Header = memo(
  ({ title, subtitle, children, imageName, imagePath, alt }) => {
    const imgSet = images[imageName];

    return (
      <HeaderStyle $imagePath={imagePath}>
        {(imgSet || imagePath) && (
          <picture>
            {imgSet ? (
              <>
                <source srcSet={imgSet[800]} media="(min-width: 768px)" />
                <source srcSet={imgSet[600]} media="(min-width: 560px)" />
                <source srcSet={imgSet[400]} media="(min-width: 400px)" />
                <img
                  src={imgSet[200]}
                  alt={
                    alt
                      ? alt
                      : imageName
                      ? `Picture of ${imageName}`
                      : "Header image"
                  }
                  width="200"
                  height="89"
                  fetchpriority="high"
                />
              </>
            ) : (
              <img src={imagePath} alt={alt} />
            )}
          </picture>
        )}
        <div>
          <h1>
            {title}
            <br />
            <span>{subtitle}</span>
          </h1>
          {children}
        </div>
      </HeaderStyle>
    );
  }
);
