import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getCarNotes,
  deleteCarNotes,
  updateCarNotes,
  createCarNotes,
} from "../api/notesApi";
import { InputError } from "./InputError";
import { ButtonCard } from "./ButtonCard";
import styled from "styled-components";

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin: 20px 10px;

  h2 {
    margin: 20px 0 10px;
    text-align: center;
    color: ${({ theme }) => theme.colors.text.heading2};
  }
`;

const FormStyle = styled.form`
  display: ${({ $showTable }) => ($showTable ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin: 20px 10px;
  width: 100%;
  max-width: 630px;

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    width: 100%;

    textarea {
      width: 100%;
      max-width: 450px;
      min-height: 100px;
      resize: none;
      border-radius: 8px;
      padding: 2px 5px;
      outline-style: none;
      border: none;
      background-color: ${({ theme }) => theme.colors.form.inputBg};
      color: ${({ theme }) => theme.colors.form.inputText};
      box-shadow: 1px 1px 3px 0 ${({theme}) => theme.colors.form.inputShadow};
    }
  }

  div:last-child {
    display: flex;
    gap: 10px;
    margin: 10px;
  }
`;

const UserNotesCar = ({ carId }) => {
  const [backupText, SetBeckupText] = useState();
  const [showTable, setShowTable] = useState(false);
  const [changePost, setChangePost] = useState(false);
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
  const [fetchMessage, setFetchMessage] = useState("");
  const token = useSelector((state) => state.user.token);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCarNotes(token, carId, t);

      if (response.success && response.post) {
        setText(response.post.content_text);
        setPost(response.post);
        setShowTable(true);
        SetBeckupText(response.post.content_text);
      } else {
        setText("");
        setPost(null);
        setShowTable(false);
        SetBeckupText(null);
      }
    };

    fetchData();
  }, [changePost, token, carId]);

  const handleDelete = async () => {
    const response = await deleteCarNotes(token, carId, t);

    if (response.success) {
      setChangePost((prev) => !prev);
    }
    setFetchMessage(response.message);
    setTimeout(() => setFetchMessage(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response =
      post && Object.keys(post).length > 0
        ? await updateCarNotes(token, carId, text, t)
        : await createCarNotes(token, carId, text, t);
    if (response.success) {
      setChangePost((prev) => !prev);
    } else {
      setText(backupText);
    }

    setFetchMessage(response.message);
    setTimeout(() => setFetchMessage(""), 2000);
  };

  return (
    <ContainerStyle>
      <h2>{t("pages.service.contentUserCar.listUserCars.userNotesCar.p")}</h2>
      {(!post || Object.keys(post).length === 0) && (
        <ButtonCard onClick={() => setShowTable((prev) => !prev)}>
          {showTable ? "−" : "+"}
        </ButtonCard>
      )}
      <FormStyle onSubmit={handleSubmit} $showTable={showTable}>
        <div>
          <label htmlFor="notes-user-car">
            {t("pages.service.contentUserCar.listUserCars.userNotesCar.label")}
          </label>
          <textarea
            id="notes-user-car"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <ButtonCard type="submit">
            {post && Object.keys(post).length > 0
              ? t("pages.service.vehicle.tbody.buttonChange")
              : t(
                  "pages.service.contentUserCar.listUserCars.userNotesCar.createButton"
                )}
          </ButtonCard>
          {post && Object.keys(post).length > 0 && (
            <ButtonCard type="button" variant="delete" onClick={handleDelete}>
              {t("pages.service.contentUserCar.listUserCars.buttonDelete")}
            </ButtonCard>
          )}
        </div>
      </FormStyle>
      <InputError error={fetchMessage} />
    </ContainerStyle>
  );
};

export default UserNotesCar;
