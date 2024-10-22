import { TouchableOpacityProps, Text, TouchableOpacity } from "react-native";
import { Painel } from "./style";

export interface IBIInterface extends TouchableOpacityProps {
    onPressI: () => void
    title: string
    type: 'primary' | 'secondary' | 'third'
}

export function ButtonInterface({onPressI, title, type, ...rest}: IBIInterface) {
    return (
        <TouchableOpacity style = {
            type == "primary" ? Painel.buttonPrimary :
                type == "secondary" ? Painel.buttonSecondary :
                    Painel.buttonThird
        }
        
            onPress={onPressI} {...rest}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}