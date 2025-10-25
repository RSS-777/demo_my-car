import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { changeLang } from "../store/lang/langSlice";
import { changeTheme } from "../store/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "./Logo";
import styled from "styled-components";
import "../i18n";
import iconMonth from "../assets/images/icons/month.png";
import iconSun from "../assets/images/icons/sun.png";
import doorBlue from "../assets/images/icons/myDoorBlue.png";
import doorBlack from "../assets/images/icons/myDoorBlack.png";
import doorCoral from "../assets/images/icons/myDoorCoral.png";
import doorWhite from "../assets/images/icons/myDoorWhite.png";
import userBlackImage from "../assets/images/icons/myUserBlack.png";
import userBlueImage from "../assets/images/icons/myUserBlue.png";
import userWhiteImage from "../assets/images/icons/myUserWhite.png";
import userCoralImage from "../assets/images/icons/myUserCoral.png";
import adminBlueImage from "../assets/images/icons/adminBlue.png";
import adminBlackImage from "../assets/images/icons/adminBlack.png";
import adminWhiteImage from "../assets/images/icons/adminWhite.png";
import adminCoralImage from "../assets/images/icons/adminCoral.png";

const NavStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 5;
  padding: 10px;
`;

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.text.link};
  position: relative;

  img {
    width: 18px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.text.linkActive};
  }

  &.disabled {
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    display: block;
    width: 80%;
    height: 1.5px;
    background-color: ${({ theme }) => theme.colors.background.linkHover};
    transition: transform 0.3s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover::after {
      transform: translateX(-50%) scaleX(1);
    }
  }

  @media (max-width: 678px) {
    margin-top: 5px;
    padding-bottom: 2px;
    border-bottom: 2px solid transparent;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LinkBlock = styled.div`
  @media (max-width: 678px) {
    box-sizing: border-box;
    width: 100%;
    min-height: 165px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 4;
    padding: 70px 20px 20px;
    top: ${(props) => (props.$isOpen ? "0" : "-320px")};
    left: 0;
    background-color: ${({ theme }) => theme.colors.background.default};
    box-shadow: 0 0.5px 8px 0 ${({ theme }) => theme.colors.boxShadow.default};
    transition: top 1s ease;
  }
`;

const LangAndThemeBlock = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.active};
  padding: 4px;
  border-radius: 10px;
  margin-left: 20px;
  position: relative;
  z-index: 6;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.button.settings};
    cursor: pointer;
    width: 40px;
    height: 20px;
    border-radius: 8px;
    border: none;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.button.settingsHover};
      }
    }

    img {
      width: 12px;
      height: 12px;
    }
  }

  select {
    cursor: pointer;
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 8px;
    border: none;
    background-color: ${({ theme }) => theme.colors.button.settings};
    color: ${({ theme }) => theme.colors.button.settingsText};
    text-align: center;
    outline-style: none;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.button.settingsHover};
      }
    }
  }
`;

const BurgerMenu = styled.div`
  display: none;
  position: relative;
  width: 22px;
  height: 20px;

  span {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.background.reverse};
    transition: transform 0.4s ease;

    &::before {
      content: "";
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.background.reverse};
      position: absolute;
      top: -6px;
      left: 0;
      transition: transform 0.4s ease;
    }

    &::after {
      content: "";
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.background.reverse};
      position: absolute;
      top: 6px;
      left: 0;
      transition: transform 0.4s ease;
    }
  }

  label {
    display: block;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    label:hover span {
      background-color: ${({ theme }) => theme.colors.background.linkHover};

      &::after {
        background-color: ${({ theme }) => theme.colors.background.linkHover};
      }

      &::before {
        background-color: ${({ theme }) => theme.colors.background.linkHover};
      }
    }
  }

  input {
    display: none;
  }

  input:checked + span {
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.colors.background.linkHover};

    &::before {
      transform: rotate(90deg);
      top: 0;
      background-color: ${({ theme }) => theme.colors.background.linkHover};
    }

    &::after {
      transform: rotate(-90deg);
      top: 0;
      background-color: ${({ theme }) => theme.colors.background.linkHover};
    }
  }

  @media (max-width: 678px) {
    display: block;
  }
`;

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value);
  const lang = useSelector((state) => state.lang.value);
  const token = useSelector((state) => state.user.token);
  const tokenAdmin = useSelector((state) => state.admin.value);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleChangeLanguage = (lng) => {
    dispatch(changeLang(lng));
  };

  const handleChangeTheme = () => {
    dispatch(changeTheme());
  };

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <NavStyle>
      <Logo />
      <LinkContainer>
        <LinkBlock $isOpen={isOpen} ref={menuRef}>
          <NavLinkStyle to="/">{t("navigation.home")}</NavLinkStyle>
          <NavLinkStyle
            to="/service"
            className={
              location.pathname.startsWith("/car") ? "active disabled" : ""
            }
          >
            {t("navigation.service")}
          </NavLinkStyle>

          <NavLinkStyle to="/contact">{t("navigation.contact")}</NavLinkStyle>
          {token ? (
            <NavLinkStyle to="/user">
              {({ isActive }) => (
                <img
                  src={
                    theme === "light"
                      ? isActive
                        ? userBlueImage
                        : userBlackImage
                      : isActive
                      ? userCoralImage
                      : userWhiteImage
                  }
                  alt="Image logo"
                />
              )}
            </NavLinkStyle>
          ) : (
            <NavLinkStyle to="/login">
              {({ isActive }) => (
                <img
                  src={
                    theme === "light"
                      ? isActive
                        ? doorBlue
                        : doorBlack
                      : isActive
                      ? doorCoral
                      : doorWhite
                  }
                  alt="Image logo"
                />
              )}
            </NavLinkStyle>
          )}
          {tokenAdmin && (
            <NavLinkStyle to="/admin">
              {({ isActive }) => (
                <img
                  src={
                    theme === "light"
                      ? isActive
                        ? adminBlueImage
                        : adminBlackImage
                      : isActive
                      ? adminCoralImage
                      : adminWhiteImage
                  }
                  alt="Image logo"
                />
              )}
            </NavLinkStyle>
          )}
        </LinkBlock>
        <LangAndThemeBlock>
          <BurgerMenu ref={burgerRef} $isOpen={isOpen}>
            <label>
              <input
                type="checkbox"
                id="burger-menu-toggle"
                name="burger-menu-toggle"
                checked={isOpen}
                onClick={handleMenuToggle}
              />
              <span></span>
            </label>
          </BurgerMenu>
          <button type="button" onClick={handleChangeTheme}>
            <img
              src={theme === "light" ? iconSun : iconMonth}
              alt="Icon theme"
              width="12"
              height="12"
            />
          </button>
          <select
            name="lang"
            id="lang-navigation"
            onChange={(event) => handleChangeLanguage(event.target.value)}
            aria-label="Select language"
          >
            <option value="ua">ua</option>
            <option value="ru">ru</option>
            <option value="en">en</option>
          </select>
        </LangAndThemeBlock>
      </LinkContainer>
    </NavStyle>
  );
};
