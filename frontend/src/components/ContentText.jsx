import styled from "styled-components";
import { MaxWidthContainer } from "./MaxWidthContainer";

const SectionStyle = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.contentText.background};
  padding: 80px 20px;

    div {
        h4 { 
            text-align: center;
            padding-bottom: 15px;
            color: ${({ theme }) => theme.contentText.h4};
            font-size: clamp(18px, 5vw, 24px);
        }

        p {
            color: ${({ theme }) => theme.contentText.text};
            margin: 0;
            text-align: left;
            font-size: clamp(14px, 4vw, 18px);
            font-style: normal;
        }

        ul {
           li {
                font-size: clamp(14px, 4vw, 18px);
                font-style: normal;
                color: ${({ theme }) => theme.contentText.li};
           }
        }
    }
`;

export const ContentText = ({ h4, p, p2, li1, li2, li3, li4, li5 }) => {
    return (
        <SectionStyle>
            <MaxWidthContainer>
                <h4>{h4}</h4>
                <p>{p}</p>
                <ul>
                    <li>{li1}</li>
                    <li>{li2}</li>
                    <li>{li3}</li>
                    <li>{li4}</li>
                    <li>{li5}</li>
                </ul>
                <p>{p2}</p>
            </MaxWidthContainer>
        </SectionStyle>
    )
};