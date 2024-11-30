import axios from "axios"
import { useMemo, useContext ,} from "react"
import { useNavigation } from '@react-navigation/core';
import { Alert } from "react-native";
import { MMKV } from 'react-native-mmkv'
import { LoadingContext } from "../components/LoadingContextProvider";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export const storage = new MMKV()

//export const BASE_URL = "http://192.168.0.4:8083/api/v1"
export const BASE_URL = "https://mobil.turkuazoto.com.tr/api/v1"
//export const BASE_URL_FRONTEND = "http://192.168.0.4:3000";
export const BASE_URL_FRONTEND = "https://mobil.turkuazoto.com.tr";

axios.defaults.timeout === 10000;

axios.defaults.baseURL = BASE_URL;
// axios.defaults.withCredentials = true


const ApiProvider = ({ children }) => {
    const { loading, setLoading } = useContext(LoadingContext)
    const navigation = useNavigation()

    useMemo(() => {

        axios.interceptors.request.use(async (config) => {
            setLoading(true)
            const token = storage.getString("Turkuaz:token");

            axios.defaults.headers["Accept-Language"] = "tr"

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
            return config
        }, async () => {
            setLoading(false)
        });
        axios.interceptors.response.use(async (response) => {
            setLoading(false)

            // if (response.status === 401) {
            //     window.location.href = "/login"
            //     return response
            // }


            if (response?.data?.token) {
                storage.set('Turkuaz:token', response?.data?.token)
          
            }


            return response;
        }, (error) => {
            setLoading(false)

            const statusCode = error.response ? error.response.status : null;

            switch (statusCode) {
                case 404:
                    break;
                case 400:
                    if (error?.response?.status === 400) {
                        if (Array.isArray(error.response.data.message)) {
                            error.response.data.message.map(v => (
                                Dialog.show(
                                    {
                                        type: ALERT_TYPE.WARNING,
                                        title: 'Uyarı',
                                        textBody: `${v}`,
                                        button: 'Tamam',
                                    })
                            ))
                        } else {
                        }
                    }
                    break;
                case 401:
                    if (storage.getBoolean('firstLogin')) {
                        if (navigation.getCurrentRoute().name !== "Login") {
                            Dialog.show({
                                type: ALERT_TYPE.WARNING,
                                title: 'Uyarı',
                                textBody: "Oturumunuz kapatıldı. Lütfen tekrar giriş yapınız.",
                                button: 'Tamam',
                            })
                        }
                    }

                    break;
                case 503:
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Uyarı',
                        textBody: "Sistemde çalışma var. Birazdan tekrara deneyiniz.",
                        button: 'Tamam',
                    })
                    break;
                case 500:
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Uyarı',
                        textBody: "Bilinmeyen hata meydana geldi. Lütfen sistem yöneticinizle konuşunuz.",
                        button: 'Tamam',
                    })
                    break;
                default:
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Uyarı',
                        textBody: "Sunucuya ulaşılmıyor. İnternete bağlı olduğunuza emin olun.",
                        button: 'Tamam',
                    })
                    break;
            }
            return Promise.reject(error)

        }
        );
    }, [setLoading])
    return children
}



export default ApiProvider