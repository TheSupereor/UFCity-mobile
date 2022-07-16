import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    return 'Sem Registro'
    alert('No values stored under that key.');
  }
}

export {
  save,
  getValueFor
}