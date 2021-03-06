import React, {
    createRef,
} from 'react';
import axios from 'axios';
import {
    Button,
    Layout,
} from '@ui-kitten/components';

import Input from './components/Input';
import Select from './components/Select';
import { baseURL } from './configs'

export const RegistryScreen = ({ navigation }) => {
    const inputNameRef = createRef(null);
    const selectTypeRef = createRef(null);
    const inputLoginRef = createRef(null);
    const inputPasswordRef = createRef(null);
    const inputConfirmPasswordRef = createRef(null);

    const getInputNameRef = () => {
        return inputNameRef.current;
    };

    const getSelectTypeRef = () => {
        return selectTypeRef.current;
    };

    const getInputLoginRef = () => {
        return inputLoginRef.current;
    };

    const getInputPasswordRef = () => {
        return inputPasswordRef.current;
    };

    const getInputConfirmPasswordRef = () => {
        return inputConfirmPasswordRef.current;
    };

    const handleOnBackButtonPress = () => {
        navigation.navigate('Login');
    };

    const handleOnSaveButtonPress = async () => {
        let auxInputNameRef = getInputNameRef();
        let auxSelectTypeRef = getSelectTypeRef();
        let auxInputLoginRef = getInputLoginRef();
        let auxInputPasswordRef = getInputPasswordRef();
        let auxInputConfirmPasswordRef = getInputConfirmPasswordRef();

        let name = auxInputNameRef.getValue();
        let type = auxSelectTypeRef.getValue();
        let login = auxInputLoginRef.getValue();
        let password = auxInputPasswordRef.getValue();
        let confirmPassword = auxInputConfirmPasswordRef.getValue();

        let isNameValid = true;
        let isTypeValid = true;
        let isLoginValid = true;
        let isPasswordValid = true;
        let isConfirmPasswordValid = true;

        if (!name) {
            isNameValid = false;

            auxInputNameRef.setValid(false);
        }

        if (!type) {
            isTypeValid = false;

            auxSelectTypeRef.setValid(false);
        }

        if (!login) {
            isLoginValid = false;

            auxInputLoginRef.setValid(false);
        }

        if (!password) {
            isPasswordValid = false;

            auxInputPasswordRef.setValid(false);
        }

        if (!confirmPassword) {
            isConfirmPasswordValid = false;

            auxInputConfirmPasswordRef.setValid(false);
        }

        if (isNameValid && isTypeValid && isLoginValid && isPasswordValid && isConfirmPasswordValid) {
            if (password != confirmPassword) {
                alert('Favor confirmar a senha');
            } else {
                try {
                    await axios.post(`${baseURL}/users/register`, {
                        name,
                        type,
                        login,
                        password,
                        photo: 'fixo.jpg',
                    });

                    if (type == 'R') {
                        navigation.navigate('Pets');
                    } else {
                        navigation.navigate('Home');
                    }
                } catch (error) {
                    alert('Falha ao tentar fazer o cadastro');
                }
            }
        }
    };

    return (
        <Layout
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '5%',
            }}
        >
            <Input
                ref={inputNameRef}
                placeholder='Nome'
                style={{
                    paddingBottom: '5%',
                }}
            />
            <Select
                ref={selectTypeRef}
                placeholder='Tipo'
                style={{
                    with: '100%',
                    paddingBottom: '5%',
                }}
                options={[
                    {
                        value: 'R',
                        display: 'Respons??vel',
                    },
                    {
                        value: 'C',
                        display: 'Comum',
                    },
                ]}
            />
            <Input
                ref={inputLoginRef}
                placeholder='Usu??rio'
                style={{
                    paddingBottom: '5%',
                }}
            />
            <Input
                secureTextEntry
                ref={inputPasswordRef}
                placeholder='Senha'
                style={{
                    paddingBottom: '5%',
                }}
            />
            <Input
                secureTextEntry
                ref={inputConfirmPasswordRef}
                placeholder='Confirmar Senha'
                style={{
                    paddingBottom: '5%',
                }}
            />
            <Layout
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <Button
                    onPress={handleOnBackButtonPress}
                    style={{
                        marginRight: '5%',
                    }}
                >
                    VOLTAR
                </Button>
                <Button onPress={handleOnSaveButtonPress}>
                    SALVAR
                </Button>
            </Layout>
            {/* "photo": "image.jpg" */}
        </Layout>
    );
}
