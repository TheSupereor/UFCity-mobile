import * as WebBrowser from 'expo-web-browser';
 
export default async function WebBrowserOpener (link: string) {
    let result = await WebBrowser.openBrowserAsync(link);
}