import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { Button, StatusBar, StyleSheet, TextInput, View } from "react-native";
import SystemNavigationBar from "react-native-system-navigation-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

    const [textInput, setTextInput] = React.useState("");
    const [webUrl, setWebUrl] = React.useState(null);


    useEffect(() => {
        AsyncStorage.getItem("textInput").then((value) => {
            console.log("value", value);
            if (value) {
                setTextInput(value);
            }
        }).catch(console.error);
    }, []);

    useEffect(() => {
        StatusBar.setHidden(true);
        SystemNavigationBar.navigationHide(true);
        SystemNavigationBar.stickyImmersive(true);
    }, [webUrl, textInput]);


    const onPress = async () => {
        console.log("onPress");
        const res = await AsyncStorage.setItem("textInput", textInput);
        setWebUrl(textInput);
    };

    if (!webUrl)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TextInput style={{ height: 60, width: "90%", backgroundColor: "#eee", marginBottom: 20, fontSize: 20 }} placeholder="   Enter url e.g. 10.0.0.27:3000" value={textInput} onChangeText={setTextInput} />
                <Button title="Connect To Server" onPress={() => onPress()} />
            </View>
        );


    return (
        <WebView
            style={styles.container}
            source={{ uri: webUrl + "?t=" + Date.now() }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
