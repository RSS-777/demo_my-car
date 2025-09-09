const common = {
    light: {
        h1: '#4C9B8D',
        h2: '#4C9B8D',
        h2Light: '#6FB4A5',
        h3: '#033703',
        h4: '#334E43',
        h5: '#2F3D3A',
        boxShadow: {
            linkBlock: '#4C9B8D',
        },
        text: {
            pDefaultColor: 'black'
        },
        background: {
            blockCard: '#E8D2AE',
            nav: '#FFFFFFE0'
        },
        mistake: '#870303',
        form: {
            label: '#004D47'
        },
        table: {
            th: '#004D47',
            td: '#5E3023'
        }
    },
    dark: {
        h1: 'white',
        h2: 'white',
        h2Light: '#CCFFCD',
        h3: '#033703',
        h4: '#4C9B8D',
        h5: '#2F3D3A',
        boxShadow: {
            linkBlock: '#F67B4E',
        },
        text: {
            pDefaultColor: 'black'
        },
        background: {
            blockCard: '#CFCFCD',
            nav: '#000000B8'
        },
        mistake: '#D00707',
        form: {
            label: '#004D47'
        },
        table: {
            th: '#004D47',
            td: '#5E3023'
        }
    }
};

export const lightTheme = {
    app: {
        background: '#FFFFFF'
    },
    advertising: {
        container: {
            background: '#FFFFFFE0',
        },
        background: 'white',
        boxShadow: common.light.boxShadow.linkBlock,
        textShadow: 'white',
        h5: common.light.h5,
        button: {
            text: '#007F7F',
            hover: '#004D47'
        }
    },
    blockImage: {
        shadow: 'black'
    },
    buttonForm: {
        background: '#E6E6E6',
        text: '#4C9B8D',
        shadow: '#333333',
        hover: {
            background: '#B8B8B8',
            shadow: '#333333',
            text: 'white'
        },
        disableButton: {
            background: 'gray',
            text: 'white',
            hover: {
                background: 'gray',
                shadow: '#333333',
                text: 'white'
            }
        },
        disabled: {
            background: 'gray',
            text: 'white',
            shadow: 'none',
            hover: {
                background: 'gray',
                text: 'white',
                shadow: 'none'
            }
        }
    },
    buttonGarage: {
        background: '#E6E6E6',
        text: '#4C9B8D',
        shadow: '#333333',
        hover: {
            background: '#B8B8B8',
            shadow: '#333333',
            text: 'white'
        },
        disabled: {
            background: '#ccc',
            text: '#999',
            shadow: 'none'
        }
    },
    buttonLink: {
        background: '#E6E6E6',
        text: '#4C9B8D',
        shadow: '#333333',
        hover: {
            background: '#B8B8B8',
            text: 'white',
            shadow: '#333333'
        },
        active: {
            background: '#B8B8B8',
            shadow: '#333333',
            text: 'white'
        }
    },
    cardInfoPay: {
        shadow: common.light.boxShadow.linkBlock,
        background: common.light.background.blockCard,
        h4: common.light.h4,
        p: common.light.text.pDefaultColor,
        div: {
            background: '#4C9B8D',
            text: 'white'
        },
        hiddenContent: {
            background: '#FFFFFFE3',
            span: {
                text: '#5E3023'
            }
        }
    },
    changeAdvertisingAdmin: {
        h5: common.light.h4,
        border: '#007F7F',
        legend: '#007F7F',
        h6: '#5E3023',
        label: '#004D47',
        shadow: 'black',
        message: common.light.mistake
    },
    changeCostAdmin: {
        h5: common.light.h4,
        label: common.light.form.label,
        shadow: 'black',
        blockError: {
            text: common.light.mistake
        }
    },
    changeOrderAdmin: {
        h5: common.light.h4,
        text: '#333333',
        table: {
            border: 'black',
            th: common.light.table.th,
            td: common.light.table.td,
        },
        button: {
            background: '#E6E6E6',
            text: '#4C9B8D',
            shadow: '#333333',
            hover: {
                background: '#B8B8B8',
                shadow: '#333333',
                text: 'white'
            }
        },
        select: {
            background: '#E6E6E6',
            text: '#4C9B8D',
            shadow: '#333333',
            hover: {
                background: '#B8B8B8',
                shadow: '#333333',
                text: 'white'
            }
        },
        filter: {
            text: common.light.form.label
        },
        list: {
            li: '#5c5c5c',
            span: common.light.mistake
        }
    },
    changePaymentAdmin: {
        h5: common.light.h4,
        form: {
            text: '#333333'
        },
        blockField: {
            background: '#E6E6E6',
            text: '#4C9B8D',
            label: common.light.form.label,
            shadow: 'black',
        },
        blockError: {
            text: common.light.mistake
        }
    },
    contentNotUser: {
        main: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                background: '#F1F1F1'
            },
            h4: common.light.h2
        }
    },
    contentText: {
        background: '#FFFFFF',
        h4: common.light.h4,
        text: '#000000',
        li: '#000000'
    },
    contentUserCar: {
        before: {
            background: '#FFFFFFA6'
        },
        after: {
            background: '#F1F1F1'
        },
        h2: common.light.h2Light,
        text: '#000000',
        modal: {
            background: '#ffffffed'
        }
    },
    footer: {
        background: common.light.background.nav,
        border: 'black',
        div: {
            text: '#007F7F'
        },
        p: {
            text: '#4C4C4C'
        }
    },
    formAddCar: {
        text: '#333333',
        shadow: '#4C9B8D',
        background: '#E8D2AE',
        blockField: {
            optgroup: {
                text: common.light.h4
            },
            option: {
                text: 'black'
            },
            label: common.light.form.label,
            input: {
                shadow: 'black'
            },
            image: {
                before: {
                    background: 'white',
                    text: 'gray'
                },
                hover: {
                    text: '#004D47'
                },
                after: {
                    background: 'gray',
                    text: 'white'
                }
            },

        },
        blockError: {
            text: common.light.mistake
        }
    },
    formAddServiceRecord: {
        input: {
            shadow: 'black'
        },
        button: {
            shadow: '#333333',
            background: '#E6E6E6',
            text: '#4C9B8D',
            hover: {
                shadow: '#333333',
                background: '#B8B8B8',
                text: 'white'
            }
        },
        errorMessage: {
            text: common.light.mistake
        }
    },
    formChangePassword: {
        h2: common.light.h4,
        blockField: {
            label: common.light.form.label,
            input: {
                shadow: 'black'
            }
        },
        error: {
            text: common.light.mistake
        }
    },
    formChangeProfile: {
        h2: common.light.h4,
        blockField: {
            label: common.light.form.label,
            input: {
                shadow: 'black'
            },
            image: {
                before: {
                    background: 'white',
                },
                hover: {
                    text: '#004D47'
                },
                after: {
                    background: 'gray',
                    text: 'white'
                }
            }
        },
        error: {
            text: common.light.mistake
        }
    },
    formChangeRepair: {
        button: {
            shadow: '#333333',
            background: '#E6E6E6',
            text: '#4C9B8D',
            hover: {
                shadow: '#333333',
                background: '#B8B8B8',
                text: 'white'
            }
        },
        form: {
            input: {
                shadow: 'black'
            },
            button: {
                shadow: '#333333',
                background: '#E6E6E6',
                text: '#4C9B8D',
                hover: {
                    shadow: '#333333',
                    background: '#B8B8B8',
                    text: 'white'
                }
            }
        },
        error: {
            text: common.light.mistake
        }
    },
    formChangeTariff: {
        h2: common.light.h4,
        blockText: {
            h5: '#5c5c5c',
            p: {
                em: '#5c5c5c',
                i: common.light.mistake
            },
            span: '#007F7F'
        },
        blockField: {
            label: common.light.form.label,
            select: {
                shadow: 'black'
            },
            div: {
                text: common.light.form.label,
                span: common.light.mistake,
                i: common.light.mistake
            }
        }
    },
    formContact: {
        before: {
            background: '#FFFFFFA6'
        },
        after: {
            background: '#F1F1F1'
        },
        h2: common.light.h2,
        formMessage: {
            div: {
                shadow: '#4C9B8D',
                background: '#E8D2AE',
            }
        },
        blockField: {
            label: common.light.form.label,
            input: {
                shadow: 'black'
            },
            textarea: {
                shadow: 'black'
            }
        },
        errorMessage: {
            text: common.light.mistake
        },
        message: {
            text: common.light.mistake,
            span: {
                shadow: 'white'
            }
        }
    },
    formDeleteUser: {
        h2: common.light.h4,
        blockInformation: {
            h4: common.light.mistake
        },
        blockField: {
            label: common.light.form.label
        },
        input: {
            shadow: 'black'
        },
        error: common.light.mistake
    },
    formLogin: {
        blockField: {
            label: common.light.form.label,
            input: {
                shadow: 'black'
            }
        },
        errorMessage: {
            text: common.light.mistake
        }
    },
    formLoginAdmin: {
        shadow: '#4C9B8D',
        background: '#E8D2AE',
        blockField: {
            label: common.light.form.label,
            input: {
                shadow: 'black'
            }
        },
        errorMessage: {
            text: common.light.mistake
        }
    },
    formRegistration: {
        blockField: {
            label: common.light.form.label,
            input: {
                shadow: 'black'
            }
        },
        blockPrivacy: {
            button: {
                background: 'transparent',
                text: '#334E43',
                hover: {
                    text: '#007F7F'
                }
            }
        },
        errorMessage: {
            text: common.light.mistake
        },
        errorConfirm: {
            text: common.light.mistake
        },
        statusMessage: {
            text: '#5E3023'
        }
    },
    header: {
        background: '#FFFFFFE0',
        h1: common.light.h1,
        div: {
            before: {
                background: '#FFFFFFA6'
            },
            h3: common.light.h3
        }
    },
    listUserCars: {
        h5: common.light.h2,
        blockSearch: {
            input: {
                shadow: 'black'
            },
            button: {
                shadow: '#333333',
                background: '#E6E6E6',
                text: '#4C9B8D',
                hover: {
                    shadow: '#333333',
                    background: '#B8B8B8',
                    text: 'white'
                }
            },
            span: common.light.mistake
        },
        blockVehicle: {
            shadow: '#4C9B8D',
            background: '#E8D2AE',
            hover: {
                shadow: '#4C9B8D'
            }
        },
        blockElement: {
            li: '#5E3023'
        },
        buttonDeleteCar: {
            text: '#004D47',
            background: 'transparent',
            hover: {
                text: '#007F7F'
            }
        },
        buttonOpen: {
            text: '#4C9B8D',
            background: '#E6E6E6',
            active: {
                text: '#007F7F'
            },
            hover: {
                background: '#B8B8B8',
                text: 'white'
            }
        },
        detalisBlock: {
            th: '#004D47',
            td: '#5E3023',
            border: 'black'
        },
        messageCount: {
            span: 'green'
        },
        titleAdd: {
            text: '#333333'
        }
    },
    listUsersAdmin: {
        h5: common.light.h4,
        p: {
            text: '#333333',
            span: '#5E3023'
        },
        table: {
            border: 'black',
            th: '#004D47',
            td: '#5E3023'
        }
    },
    myInformation: {
        background: '#FFFFFF',
        h2: common.light.h2,
        blockInfo: {
            background: '#E8D2AE',
            shadow: '#4C9B8D',
            p: '#333333'
        },
        containerProject: {
            text: '#000000'
        },
        blockProject: {
            h4: common.light.h4,
            p: '#5E3023',
            li: '#000000'
        },
        blockProjectNote: {
            text: common.light.mistake
        }
    },
    navigation: {
        background: '#FFFFFFE0',
        navLink: {
            text: '#004D47',
            active: '#007F7F',
            after: {
                background: '#004D47'
            }
        },
        linkBlock: {
            background: '#FFFFFF',
            shadow: '#4C9B8D'

        },
        langAndTheme: {
            background: '#FFFFFF',
            shadow: '#4C9B8D',
            button: {
                background: '#E6E6E6',
                shadow: '#333333',
                hover: {
                    background: '#B8B8B8',
                    shadow: '#333333'
                }
            },
            select: {
                background: '#E6E6E6',
                text: '#4C9B8D',
                shadow: '#333333',
                hover: {
                    background: '#B8B8B8',
                    shadow: '#333333',
                    text: 'white'
                }
            }
        },
        burgerMenu: {
            span: {
                backgroundIs: '#004D47',
                background: '#4C9B8D',
                before: {
                    backgroundIs: '#004D47',
                    background: '#4C9B8D'
                },
                after: {
                    backgroundIs: '#004D47',
                    background: '#4C9B8D'
                }
            },
            label: {
                hover: {
                    background: '#004D47',
                    after: {
                        background: '#004D47'
                    },
                    before: {
                        background: '#004D47'
                    }
                }
            }
        }
    },
    order: {
        hr: 'gray',
        blockTitle: {
            h2: common.light.h4,
            p: '#5c5c5c',
            span: '#007F7F'
        },
        blockPay: {
            h4: common.light.h4,
            li: {
                text: '#5c5c5c',
                span: common.light.mistake
            }
        }
    },
    paymentBlocker: {
        shadow: '#4C9B8D'
    },
    paymentBlock: {
        h5: common.light.h4,
        form: {
            text: '#333333',
            p: '#333333'
        },
        blockField: {
            label: common.light.form.label,
            textarea: {
                shadow: 'black'
            }
        }
    },
    privacyPolicy: {
        background: 'white',
        backgroundImage: '#F1F1F1',
        blockText: {
            shadow: 'black',
            background: 'transparent',
            text: '#000000',
            p: '#7A7A7A'
        }
    },
    statusMessage: {
        span: {
            text: common.light.mistake,
        }
    },
    termsAndConditions: {
        background: 'white',
        backgroundImage: '#F1F1F1',
        blockText: {
            shadow: 'black',
            background: 'transparent',
            text: '#000000',
            p: '#7A7A7A'
        }
    },
    userNotesCar: {
        text: '#333333',
        button: {
            shadow: '#333333',
            background: '#E6E6E6',
            text: '#4C9B8D',
            hover: {
                shadow: '#333333',
                background: '#B8B8B8',
                text: 'white',
            }
        },
        form: {
            label: common.light.form.label,
            textarea: {
                shadow: 'black'
            },
            button: {
                shadow: '#333333',
                background: '#E6E6E6',
                text: '#4C9B8D',
                hover: {
                    shadow: '#333333',
                    background: '#B8B8B8',
                    text: 'white',
                }
            }
        },
        message: {
            span: common.light.mistake
        }
    },
    vehicleRepairHistory: {
        text: '#333333',
        table: {
            th: '#004D47',
            td: '#5E3023',
            border: 'black',
            button: {
                shadow: '#333333',
                background: '#E6E6E6',
                text: '#4C9B8D',
                hover: {
                    background: '#B8B8B8',
                    text: 'white'
                }
            }
        },
        notHistory: {
            text: common.light.mistake
        }
    },
    visitorStatistics: {
        h5: common.light.h4,
        table: {
            border: 'black',
            th: '#004D47',
            td: '#5E3023'
        }
    },
    pages: {
        about: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#F1F1F1'
            },
            h2: common.light.h2,
            p: {
                text: '#000000',
                shadow: 'black'
            }
        },
        admin: {
            background: '#FFFFFF',
            container: {
                shadow: '#4C9B8D',
                background: '#E8D2AE'
            },
            tabs: {
                background: '#FFFFFF',
                li: {
                    text: '#004D47',
                    active: {
                        text: '#007F7F'
                    },
                    after: {
                        background: '#007F7F'
                    }
                },
                shadow: 'black'
            }
        },
        home: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#F1F1F1'
            },
            h2: common.light.h2,
            p: {
                textIsDark: 'white',
                text: 'black'
            }
        },
        login: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#F1F1F1'
            },
            container: {
                shadow: '#4C9B8D',
                background: '#E8D2AE',
                button: {
                    border: '#A3A3A3',
                    text: '#004D47',
                    active: '#007F7F',
                    hover: {
                        border: '#007F7F'
                    }
                }
            },
            sectionMessage: {
                h3: common.light.h3,
                p: '#5E3023'
            }
        },
        pageNotFound: {
            background: '#f8f9fa',
            text: '#333'
        },
        userDashboard: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#F1F1F1'
            },
            flexContainer: {
                shadow: '#4C9B8D',
                background: '#E8D2AE'
            },
            sectionSetting: {
                button: {
                    background: '#E6E6E6',
                    text: '#4C9B8D',
                    shadow: '#333333',
                    disabled: {
                        background: '#ccc',
                        text: '#666'
                    },
                    hover: {
                        background: '#B8B8B8',
                        shadow: '#333333',
                        text: 'white'
                    }
                },
                nav: {
                    shadow: 'black',
                    background: 'white'
                }
            },
            blockUser: {
                h3: common.light.h3,
                span: '#007F7F',
                p: '#5c5c5c'
            },
            blockImportant: {
                p: '#5c5c5c',
                strong: common.light.mistake,
                span: '#007F7F'
            },
            sectionChange: {
                shadow: '#4C9B8D',
                background: '#E8D2AE'
            },
            data: {
                text: common.light.mistake
            }
        }
    }
};

export const darkTheme = {
    app: {
        background: '#B6B6B6'
    },
    advertising: {
        container: {
            background: '#000000B8',
        },
        background: 'white',
        boxShadow: common.dark.boxShadow.linkBlock,
        textShadow: 'white',
        h5: common.dark.h5,
        button: {
            text: '#007F7F',
            hover: '#004D47',
        }
    },
    blockImage: {
        shadow: 'black'
    },
    buttonForm: {
        background: '#6E6E6E',
        text: 'white',
        shadow: 'black',
        hover: {
            background: '#D6D6D6',
            shadow: 'black',
            text: 'green'
        },
        disableButton: {
            background: 'gray',
            text: 'white',
            hover: {
                background: 'gray',
                shadow: 'black',
                text: 'white'
            }
        },
        disabled: {
            background: 'gray',
            text: 'white',
            shadow: 'none',
            hover: {
                background: 'gray',
                text: 'white',
                shadow: 'none'
            }
        }
    },
    buttonGarage: {
        background: '#6E6E6E',
        text: 'white',
        shadow: 'black',
        hover: {
            background: '#D6D6D6',
            shadow: 'black',
            text: 'green'
        },
        disabled: {
            background: '#ccc',
            text: '#999',
            shadow: 'none'
        }
    },
    buttonLink: {
        background: '#6E6E6E',
        text: 'white',
        shadow: 'black',
        hover: {
            background: '#D6D6D6',
            text: 'green',
            shadow: 'black'
        },
        active: {
            background: '#D6D6D6',
            shadow: 'black',
            text: 'green'
        }
    },
    cardInfoPay: {
        shadow: common.dark.boxShadow.linkBlock,
        background: common.dark.background.blockCard,
        h4: common.dark.h4,
        p: common.dark.text.pDefaultColor,
        div: {
            background: '#4C9B8D',
            text: 'white'
        },
        hiddenContent: {
            background: '#FFFFFFE3',
            span: {
                text: '#5E3023'
            }
        }
    },
    changeAdvertisingAdmin: {
        h5: common.dark.h4,
        border: 'coral',
        legend: 'coral',
        h6: '#706677',
        label: '#004D47',
        shadow: 'black',
        message: common.dark.mistake
    },
    changeCostAdmin: {
        h5: common.dark.h4,
        label: common.dark.form.label,
        shadow: 'black',
        blockError: {
            text: common.dark.mistake
        }
    },
    changeOrderAdmin: {
        h5: common.dark.h4,
        text: 'black',
        table: {
            border: 'black',
            th: common.dark.table.th,
            td: common.dark.table.td,
        },
        button: {
            background: '#6E6E6E',
            text: 'white',
            shadow: 'black',
            hover: {
                background: '#D6D6D6',
                shadow: 'black',
                text: 'green'
            }
        },
        select: {
            background: '#6E6E6E',
            text: 'white',
            shadow: 'black',
            hover: {
                background: '#D6D6D6',
                shadow: 'black',
                text: 'green'
            }
        },
        filter: {
            text: common.dark.form.label
        },
        list: {
            li: '#5c5c5c',
            span: common.dark.mistake
        }
    },
    changePaymentAdmin: {
        h5: common.dark.h4,
        form: {
            text: 'black'
        },
        blockField: {
            background: '#6E6E6E',
            text: 'white',
            label: common.dark.form.label,
            shadow: 'black',
        },
        blockError: {
            text: common.dark.mistake
        }
    },
    contentNotUser: {
        main: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                background: '#333333'
            },
            h4: common.dark.h2
        }
    },
    contentText: {
        background: '#333333',
        h4: common.dark.h4,
        text: 'white',
        li: 'white'
    },
    contentUserCar: {
        before: {
            background: '#FFFFFFA6'
        },
        after: {
            background: '#333333'
        },
        h2: common.dark.h2Light,
        text: 'white',
        modal: {
            background: '#000000db'
        }
    },
    footer: {
        background: common.dark.background.nav,
        border: 'black',
        div: {
            text: 'coral'
        },
        p: {
            text: 'white'
        }
    },
    formAddCar: {
        text: 'black',
        shadow: '#F67B4E',
        background: '#CFCFCD',
        blockField: {
            optgroup: {
                text: common.light.h4
            },
            option: {
                text: 'black'
            },
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            },
            image: {
                before: {
                    background: 'white',
                    text: 'gray'
                },
                hover: {
                    text: 'coral'
                },
                after: {
                    background: 'gray',
                    text: 'white'
                }
            },

        },
        blockError: {
            text: common.dark.mistake
        }
    },
    formAddServiceRecord: {
        input: {
            shadow: 'black'
        },
        button: {
            shadow: 'black',
            background: '#6E6E6E',
            text: 'white',
            hover: {
                shadow: 'black',
                background: '#D6D6D6',
                text: 'green'
            }
        },
        errorMessage: {
            text: common.dark.mistake
        }
    },
    formChangePassword: {
        h2: common.dark.h4,
        blockField: {
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            }
        },
        error: {
            text: common.dark.mistake
        }
    },
    formChangeProfile: {
        h2: common.dark.h4,
        blockField: {
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            },
            image: {
                before: {
                    background: 'white',
                },
                hover: {
                    text: 'coral'
                },
                after: {
                    background: 'gray',
                    text: 'white'
                }
            }
        },
        error: {
            text: common.dark.mistake
        }
    },
    formChangeRepair: {
        button: {
            shadow: 'black',
            background: '#6E6E6E',
            text: 'white',
            hover: {
                shadow: 'black',
                background: '#D6D6D6',
                text: 'green'
            }
        },
        form: {
            input: {
                shadow: 'black'
            },
            button: {
                shadow: 'black',
                background: '#6E6E6E',
                text: 'white',
                hover: {
                    shadow: 'black',
                    background: '#D6D6D6',
                    text: 'green'
                }
            }
        },
        error: {
            text: common.light.mistake
        }
    },
    formChangeTariff: {
        h2: common.dark.h4,
        blockText: {
            h5: '#5c5c5c',
            p: {
                em: '#5c5c5c',
                i: common.dark.mistake
            },
            span: '#007F7F'
        },
        blockField: {
            label: common.dark.form.label,
            select: {
                shadow: 'black'
            },
            div: {
                text: common.dark.form.label,
                span: common.dark.mistake,
                i: common.dark.mistake
            }
        }
    },
    formContact: {
        before: {
            background: '#FFFFFFA6'
        },
        after: {
            background: '#333333'
        },
        h2: common.dark.h2,
        formMessage: {
            div: {
                shadow: '#F67B4E',
                background: '#CFCFCD',
            }
        },
        blockField: {
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            },
            textarea: {
                shadow: 'black'
            }
        },
        errorMessage: {
            text: common.light.mistake
        },
        message: {
            text: common.light.mistake,
            span: {
                shadow: 'white'
            }
        }
    },
    formDeleteUser: {
        h2: common.dark.h4,
        blockInformation: {
            h4: common.dark.mistake
        },
        blockField: {
            label: common.dark.form.label
        },
        input: {
            shadow: 'black'
        },
        error: common.dark.mistake
    },
    formLogin: {
        blockField: {
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            }
        },
        errorMessage: {
            text: common.dark.mistake
        }
    },
    formLoginAdmin: {
        shadow: '#F67B4E',
        background: '#CFCFCD',
        blockField: {
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            }
        },
        errorMessage: {
            text: common.dark.mistake
        }
    },
    formRegistration: {
        blockField: {
            label: common.dark.form.label,
            input: {
                shadow: 'black'
            }
        },
        blockPrivacy: {
            button: {
                background: 'transparent',
                text: '#5E3023',
                hover: {
                    text: 'coral'
                }
            }
        },
        errorMessage: {
            text: common.dark.mistake
        },
        errorConfirm: {
            text: common.light.mistake
        },
        statusMessage: {
            text: '#706677'
        }
    },
    header: {
        background: '#000000B8',
        h1: common.dark.h1,
        div: {
            before: {
                background: '#FFFFFFA6'
            },
            h3: common.dark.h3
        }
    },
    listUserCars: {
        h5: common.dark.h2,
        blockSearch: {
            input: {
                shadow: 'black'
            },
            button: {
                shadow: 'black',
                background: '#6E6E6E',
                text: 'white',
                hover: {
                    shadow: 'black',
                    background: '#D6D6D6',
                    text: 'green'
                }
            },
            span: common.dark.mistake
        },
        blockVehicle: {
            shadow: '#F67B4E',
            background: '#CFCFCD',
            hover: {
                shadow: '#F67B4E'
            }
        },
        blockElement: {
            li: '#5E3023'
        },
        buttonDeleteCar: {
            text: '#004D47',
            background: 'transparent',
            hover: {
                text: 'coral'
            }
        },
        buttonOpen: {
            text: 'white',
            background: '#6E6E6E',
            active: {
                text: 'coral'
            },
            hover: {
                background: '#D6D6D6',
                text: 'green'
            }
        },
        detalisBlock: {
            th: '#004D47',
            td: '#5E3023',
            border: 'black'
        },
        messageCount: {
            span: 'green'
        },
        titleAdd: {
            text: 'black'
        }
    },
    listUsersAdmin: {
        h5: common.dark.h4,
        p: {
            text: 'black',
            span: '#5E3023'
        },
        table: {
            border: 'black',
            th: '#004D47',
            td: '#5E3023'
        }
    },
    myInformation: {
        background: '#333333',
        h2: common.dark.h2,
        blockInfo: {
            background: '#CFCFCD',
            shadow: '#F67B4E',
            p: 'black'
        },
        containerProject: {
            text: 'white'
        },
        blockProject: {
            h4: common.dark.h4,
            p: '#706677',
            li: 'white'
        },
        blockProjectNote: {
            text: common.dark.mistake
        }
    },
    navigation: {
        background: '#000000B8',
        navLink: {
            text: 'white',
            active: 'coral',
            after: {
                background: 'coral'
            }
        },
        linkBlock: {
            background: 'black',
            shadow: '#F67B4E'
        },
        langAndTheme: {
            background: '#333333',
            shadow: '#F67B4E',
            button: {
                background: '#6E6E6E',
                shadow: 'black',
                hover: {
                    background: '#D6D6D6',
                    shadow: 'black'
                }
            },
            select: {
                background: '#6E6E6E',
                text: 'white',
                shadow: 'black',
                hover: {
                    background: '#D6D6D6',
                    shadow: 'black',
                    text: 'green'
                }
            }
        },
        burgerMenu: {
            span: {
                backgroundIs: 'coral',
                background: 'white',
                before: {
                    backgroundIs: 'coral',
                    background: 'white'
                },
                after: {
                    backgroundIs: 'coral',
                    background: 'white'
                }
            },
            label: {
                hover: {
                    background: 'coral',
                    after: {
                        background: 'coral'
                    },
                    before: {
                        background: 'coral'
                    }
                }
            }
        }
    },
    order: {
        hr: 'gray',
        blockTitle: {
            h2: common.dark.h4,
            p: '#5c5c5c',
            span: '#007F7F'
        },
        blockPay: {
            h4: common.dark.h4,
            li: {
                text: '#5c5c5c',
                span: common.dark.mistake
            }
        }
    },
    paymentBlocker: {
        shadow: '#F67B4E'
    },
    paymentBlock: {
        h5: common.dark.h4,
        form: {
            text: 'black',
            p: 'black'
        },
        blockField: {
            label: common.dark.form.label,
            textarea: {
                shadow: 'black'
            }
        }
    },
    privacyPolicy: {
        background: 'white',
        backgroundImage: '#333333',
        blockText: {
            shadow: 'black',
            background: '#6C6C6CF2',
            text: 'white',
            p: '#A4A4A4'
        }
    },
    statusMessage: {
        span: {
            text: common.light.mistake,
        }
    },
    termsAndConditions: {
        background: 'white',
        backgroundImage: '#333333',
        blockText: {
            shadow: 'black',
            background: '#6C6C6CF2',
            text: 'white',
            p: '#A4A4A4'
        }
    },
    userNotesCar: {
        text: 'black',
        button: {
            shadow: 'black',
            background: '#6E6E6E',
            text: 'white',
            hover: {
                shadow: 'black',
                background: '#D6D6D6',
                text: 'green',
            }
        },
        form: {
            label: common.dark.form.label,
            textarea: {
                shadow: 'black'
            },
            button: {
                shadow: 'black',
                background: '#6E6E6E',
                text: 'white',
                hover: {
                    shadow: 'black',
                    background: '#D6D6D6',
                    text: 'green',
                }
            }
        },
        message: {
            span: common.dark.mistake
        }
    },
    vehicleRepairHistory: {
        text: 'black',
        table: {
            th: '#004D47',
            td: '#5E3023',
            border: 'black',
            button: {
                shadow: 'black',
                background: '#6E6E6E',
                text: 'white',
                hover: {
                    background: '#D6D6D6',
                    text: 'green'
                }
            }
        },
        notHistory: {
            text: common.dark.mistake
        }
    },
    visitorStatistics: {
        h5: common.dark.h4,
        table: {
            border: 'black',
            th: '#004D47',
            td: '#5E3023'
        }
    },
    pages: {
        about: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#333333'
            },
            h2: common.dark.h2,
            p: {
                text: 'white',
                shadow: 'black'
            }
        },
        admin: {
            background: '#333333',
            container: {
                shadow: '#F67B4E',
                background: '#CFCFCD'
            },
            tabs: {
                background: '#333333',
                li: {
                    text: 'white',
                    active: {
                        text: 'coral'
                    },
                    after: {
                        background: 'coral'
                    }
                },
                shadow: 'black'
            }
        },
        home: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#333333'
            },
            h2: common.dark.h2,
            p: {
                textIsDark: 'white',
                text: 'black'
            }
        },
        login: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#333333'
            },
            container: {
                shadow: '#F67B4E',
                background: '#CFCFCD',
                button: {
                    border: 'gray',
                    text: '#004D47',
                    active: 'coral',
                    hover: {
                        border: 'coral'
                    }
                }
            },
            sectionMessage: {
                h3: common.dark.h3,
                p: '#706677'
            }
        },
        pageNotFound: {
            background: '#D9D8D7',
            text: '#333'
        },
        userDashboard: {
            before: {
                background: '#FFFFFFA6'
            },
            after: {
                backgroundImage: '#333333'
            },
            flexContainer: {
                shadow: '#F67B4E',
                background: '#CFCFCD'
            },
            sectionSetting: {
                button: {
                    background: '#6E6E6E',
                    text: 'white',
                    shadow: 'black',
                    disabled: {
                        background: '#ccc',
                        color: '#666'
                    },
                    hover: {
                        background: '#D6D6D6',
                        shadow: 'black',
                        text: 'green'
                    }
                },
                nav: {
                    shadow: 'black',
                    background: '#8F8E8C'
                }
            },
            blockUser: {
                h3: common.dark.h3,
                span: '#007F7F',
                p: '#5c5c5c'
            },
            blockImportant: {
                p: '#5c5c5c',
                strong: common.dark.mistake,
                span: '#007F7F'
            },
            sectionChange: {
                shadow: '#F67B4E',
                background: '#CFCFCD'
            },
            data: {
                text: common.dark.mistake
            }
        }
    }
};

