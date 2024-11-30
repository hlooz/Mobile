import { Spinner } from '@ui-kitten/components'
import React, { createContext, useState } from 'react'
import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import Color from './Color'


export const LoadingContext = createContext()

const LoadingContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [loadingDisabled, setLoadingDisabled] = useState(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading, setLoadingDisabled }}>
            {children}


            {
                loading && !loadingDisabled && <LoadingView />
            }

        </LoadingContext.Provider>
    )
}

export default LoadingContextProvider


const dimensions = Dimensions.get(`screen`)

const LoadingView = () => {


    return (
        <View
            style={{
                position: `absolute`,
                width: dimensions.width,
                height: dimensions.height,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                backgroundColor: `#ffffff95`
            }}
        >
                <Spinner size='giant' style={{ color: Color.primary }} />
        </View>
    )


}