import { View } from "react-native"
import Text from "./Text"
import useSingOut from '../hooks/useSignOut';
import { useNavigate } from 'react-router-native';
import { useEffect} from "react";

const SignOut =() => {
    const [signOut] = useSingOut()
    const navigate = useNavigate()

    useEffect(() => {
        signOut()
        navigate('/')
    }, [])

    return (
        <View>
            <Text>Signing out...</Text>
        </View>
    )
}  

export default SignOut