import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getCarNotes, deleteCarNotes, updateCarNotes, createCarNotes } from "../api/notesApi";
import styled from "styled-components";

const ContainerStyle = styled.div`
   flex-direction: column;

    p:first-child {
        margin-top: 5px;
        margin-bottom: 5px;   
        color: ${({ theme }) => theme.userNotesCar.text};
    }

    >button {
        border-radius: 5px;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.userNotesCar.button.shadow};
        background: ${({ theme }) => theme.userNotesCar.button.background};
        color: ${({ theme }) => theme.userNotesCar.button.text};

        &:hover {
            box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.userNotesCar.button.hover.shadow};
            background: ${({ theme }) => theme.userNotesCar.button.hover.background};
            color: ${({ theme }) => theme.userNotesCar.button.hover.text};
        } 
    }
`;

const FormStyle = styled.form`
    display: ${({ $showTable }) => $showTable ? 'flex' : 'none'};
    gap: 5px;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 630px;

    div:first-child {
        display: flex;
        gap: 5px;
        align-items: center;
        width: 100%;

        label {
           color: ${({ theme }) => theme.userNotesCar.form.label};
        }

        textarea {
            width: 100%;
            max-width: 450px;
            min-height: 100px;
            resize: none;
            border-radius: 10px;
            padding: 5px;
            outline-style: none;
            border: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.userNotesCar.form.textarea.shadow};
        }
    }

    div:last-child {
        display: flex;
        gap: 5px;
        flex-direction: column;

        button {
            border-radius: 5px;
            padding: 2px 5px;
            cursor: pointer;
            box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.userNotesCar.form.button.shadow};
            background: ${({ theme }) => theme.userNotesCar.form.button.background};
            color:  ${({ theme }) => theme.userNotesCar.form.button.text};
            border: none;

            &:hover {
                box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.userNotesCar.form.button.hover.shadow};
                background:  ${({ theme }) => theme.userNotesCar.form.button.hover.background};
                color: ${({ theme }) => theme.userNotesCar.form.button.hover.text};
            }   
        }
    }
    
    @media (max-width: 580px) {
        flex-direction: column;

        div:first-child {
           flex-direction: column;
        }

        div:last-child {
            flex-direction: row;
        }
    }
`;

const MessageStyle = styled.div`
   margin: 0 10px 25px;
   padding: 0 10px;
   width: 100%;

    span {
        font-size: 12px;
        color: ${({ theme }) => theme.userNotesCar.message.span};
    }
`;

export const UserNotesCar = ({ carId }) => {
    const [backupText, SetBeckupText] = useState()
    const [showTable, setShowTable] = useState(false)
    const [changePost, setChangePost] = useState(false)
    const [post, setPost] = useState(null)
    const [text, setText] = useState('')
    const [fetchMessage, setFetchMessage] = useState('')
    const token = useSelector((state) => state.user.token)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCarNotes(token, carId, t)

            if (response.success && response.post) {
                setText(response.post.content_text)
                setPost(response.post)
                setShowTable(true)
                SetBeckupText(response.post.content_text)
            } else {
                setText('')
                setPost(null)
                setShowTable(false)
                SetBeckupText(null)
            }
        }

        fetchData()
    }, [changePost, token, carId])

    const handleDelete = async () => {
        const response = await deleteCarNotes(token, carId, t)

        if (response.success) {
            setChangePost(prev => !prev)
        }
        setFetchMessage(response.message)
        setTimeout(() => setFetchMessage(''), 2000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = (post && Object.keys(post).length > 0)
            ? await updateCarNotes(token, carId, text, t)
            : await createCarNotes(token, carId, text, t)
        if (response.success) {
            setChangePost(prev => !prev)
        } else {
            setText(backupText);
        }

        setFetchMessage(response.message)
        setTimeout(() => setFetchMessage(''), 2000)
    }

    return (
        <ContainerStyle>
            <p>{t("pages.service.contentUserCar.listUserCars.userNotesCar.p")}</p>
            {(!post || Object.keys(post).length === 0) &&
                <button onClick={() => setShowTable(prev => !prev)}>{showTable ? '−' : '+'}</button>
            }
            <FormStyle onSubmit={handleSubmit} $showTable={showTable}>
                <div>
                    <label htmlFor="notes-user-car">{t("pages.service.contentUserCar.listUserCars.userNotesCar.label")}</label>
                    <textarea
                        id="notes-user-car"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit"> {(post && Object.keys(post).length > 0)
                        ? t("pages.service.vehicle.tbody.buttonChange")
                        : t("pages.service.contentUserCar.listUserCars.userNotesCar.createButton")}
                    </button>
                    {(post && Object.keys(post).length > 0) &&
                        <button type="button" onClick={handleDelete}>{t("pages.service.contentUserCar.listUserCars.buttonDelete")}</button>
                    }
                </div>
            </FormStyle>
            <MessageStyle>
                <span>{fetchMessage}</span>
            </MessageStyle>
        </ContainerStyle>
    )
};