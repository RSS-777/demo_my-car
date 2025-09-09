import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { changeLang } from "../store/lang/langSlice";
import { changeTheme } from "../store/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { lightTheme } from "../styles/theme";
import styled from "styled-components";
import "../i18n";

import logoService from "../assets/images/logo/logo-service2.png";
import logoWhiteService from "../assets/images/logo/logo-serviceWhite.png";
import iconMonth from "../assets/images/icons/month.png";
import iconSun from "../assets/images/icons/sun.png";
import doorCoral from "../assets/images/icons/myDoorCoral.png";
import doorGreen from "../assets/images/icons/myDoorGreen.png";
import doorDarkGreen from "../assets/images/icons/myDoorDarkGreen.png";
import doorWhite from "../assets/images/icons/myDoorWhite.png";

import userGreenImage from "../assets/images/icons/myUserGreen.png";
import userDarkGreenImage from "../assets/images/icons/myUserDarkGreen.png";
import userWhiteImage from "../assets/images/icons/myUserWhite.png";
import userCoralImage from "../assets/images/icons/myUserCoral.png";

import adminGreenImage from "../assets/images/icons/adminGreen.png";
import adminDarkGreenImage from "../assets/images/icons/adminDarkGreen.png";
import adminWhiteImage from "../assets/images/icons/adminWhite.png";
import adminCoralImage from "../assets/images/icons/adminCoral.png";

const NavStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 5;
  background: ${({ theme }) => theme.navigation.background};
`;

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  margin-right: 10px;
  color: ${({ theme }) => theme.navigation.navLink.text};
  position: relative;

  img {
    width: 24px;
  }

  &.active {
    color: ${({ theme }) => theme.navigation.navLink.active};
  }

  &.active #login-image-navigation {
    content: ${({ theme }) =>
      theme === lightTheme ? `url(${doorGreen})` : `url(${doorCoral})`};
  }

  &.active #user-image-navigation {
    content: ${({ theme }) =>
      theme === lightTheme
        ? `url(${userGreenImage})`
        : `url(${userCoralImage})`};
  }

  &.active #admin-image-navigation {
    content: ${({ theme }) =>
      theme === lightTheme
        ? `url(${adminGreenImage})`
        : `url(${adminCoralImage})`};
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
    background-color: ${({ theme }) =>
      theme.navigation.navLink.after.background};
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  @media (max-width: 678px) {
    margin-top: 5px;
    padding-bottom: 2px;
    border-bottom: 2px solid transparent;
  }
`;

const LogoBlock = styled.div`
  width: 67px;
  padding: 15px;
  position: relative;
  z-index: 6;

  img {
    width: 100%;
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
    background: ${({ theme }) => theme.navigation.linkBlock.background};
    box-shadow: 0 1px 12px 0 ${({ theme }) => theme.navigation.linkBlock.shadow};
    transition: top 1s ease;
  }
`;

const LangAndThemeBlock = styled.div`
  display: flex;
  background: ${({ theme }) => theme.navigation.langAndTheme.background};
  box-shadow: 0.5px 0.5px 5px 0
    ${({ theme }) => theme.navigation.langAndTheme.shadow};
  padding: 8px;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 20px;
  position: relative;
  z-index: 6;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) =>
      theme.navigation.langAndTheme.button.background};
    cursor: pointer;
    margin-right: 5px;
    width: 50px;
    border-radius: 8px;
    border: none;
    box-shadow: 2px 2px 5px 0
      ${({ theme }) => theme.navigation.langAndTheme.button.shadow};

    &:hover {
      background: ${({ theme }) =>
        theme.navigation.langAndTheme.button.hover.background};
      box-shadow: 1px 1px 3px 0
        ${({ theme }) => theme.navigation.langAndTheme.button.shadow};
    }

    img {
      width: 22px;
    }
  }

  select {
    background: ${({ theme }) =>
      theme.navigation.langAndTheme.select.background};
    cursor: pointer;
    margin-right: 5px;
    width: 50px;
    height: 28px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.navigation.langAndTheme.select.text};
    box-shadow: 2px 2px 5px 0
      ${({ theme }) => theme.navigation.langAndTheme.select.shadow};
    text-align: center;
    outline-style: none;

    &:hover {
      background: ${({ theme }) =>
        theme.navigation.langAndTheme.select.hover.background};
      box-shadow: 1px 1px 3px 0
        ${({ theme }) => theme.navigation.langAndTheme.select.hover.shadow};
      color: ${({ theme }) => theme.navigation.langAndTheme.select.hover.text};
    }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const BurgerMenu = styled.div`
  display: none;
  position: relative;
  width: 26px;
  height: 26px;
  margin-right: 5px;

  span {
    content: "";
    width: 100%;
    height: 2px;
    background: ${({ $isOpen, theme }) =>
      $isOpen
        ? theme.navigation.burgerMenu.span.backgroundIs
        : theme.navigation.burgerMenu.span.background};
    position: absolute;
    top: 52%;
    left: 0;
    transform: translateY(-50%);

    &::before {
      content: "";
      width: 100%;
      height: 2px;
      background: ${({ $isOpen, theme }) =>
        $isOpen
          ? theme.navigation.burgerMenu.span.before.backgroundIs
          : theme.navigation.burgerMenu.span.before.background};
      position: absolute;
      top: -8px;
      left: 0;
      transition: transform 0.4s ease;
    }
    &::after {
      content: "";
      width: 100%;
      height: 2px;
      background: ${({ $isOpen, theme }) =>
        $isOpen
          ? theme.navigation.burgerMenu.span.after.backgroundIs
          : theme.navigation.burgerMenu.span.before.background};
      position: absolute;
      top: 8px;
      left: 0;
      transition: transform 0.4s ease;
    }
  }

  label {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  label:hover span {
    background: ${({ theme }) =>
      theme.navigation.burgerMenu.label.hover.background};

    &::after {
      background: ${({ theme }) =>
        theme.navigation.burgerMenu.label.hover.after.background};
    }

    &::before {
      background: ${({ theme }) =>
        theme.navigation.burgerMenu.label.hover.before.background};
    }
  }

  input {
    display: none;
  }

  input:checked + span {
    background: transparent;

    &::before {
      transform: rotate(45deg);
      top: 0;
    }

    &::after {
      transform: rotate(-45deg);
      top: 0;
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
      <LogoBlock>
        <img
          src={theme === "light" ? logoService : logoWhiteService}
          alt="Image logo"
        />
      </LogoBlock>
      <LinkContainer>
        <LinkBlock $isOpen={isOpen} ref={menuRef}>
          <NavLinkStyle to="/">{t("navigation.home")}</NavLinkStyle>
          <NavLinkStyle to="/service">{t("navigation.service")}</NavLinkStyle>
          <NavLinkStyle to="/contact">{t("navigation.contact")}</NavLinkStyle>
          <NavLinkStyle to="/about">{t("navigation.about")}</NavLinkStyle>
          {token ? (
            <NavLinkStyle to="/user">
              <img
                id="user-image-navigation"
                src={theme === "light" ? userDarkGreenImage : userWhiteImage}
                alt="Image logo"
              />
            </NavLinkStyle>
          ) : (
            <NavLinkStyle to="/login">
              <img
                id="login-image-navigation"
                src={theme === "light" ? doorDarkGreen : doorWhite}
                alt="Image logo"
              />
            </NavLinkStyle>
          )}
          {tokenAdmin && (
            <NavLinkStyle to="/admin">
              <img
                id="admin-image-navigation"
                src={theme === "light" ? adminDarkGreenImage : adminWhiteImage}
                alt="Image logo"
              />
            </NavLinkStyle>
          )}
        </LinkBlock>
        <LangAndThemeBlock>
          <BurgerMenu ref={burgerRef} $isOpen={isOpen}>
            <label htmlFor="burger-menu-toggle">
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
            />
          </button>
          <label htmlFor="lang-navigation" className="visually-hidden">
            Виберіть мову
          </label>
          <select
            name="lang"
            id="lang-navigation"
            onChange={(event) => handleChangeLanguage(event.target.value)}
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
