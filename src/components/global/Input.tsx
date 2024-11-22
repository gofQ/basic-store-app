import {View, TextInput} from 'react-native';
import React, { memo } from 'react';

interface InputProps {
    value: string;
    func: (text: string) => void;
    pc: string;
    password?:boolean;
    length?:number;
}


const Input:React.FC<InputProps> = ({value,func,pc,password,length}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderColor: '#ccc',
        maxHeight:45,
        height:45,
        justifyContent: 'center',
      }}>
      <TextInput
        placeholder={pc}
        style={{fontSize: 14, color: '#000', fontFamily: 'Nunito'}}
        autoCapitalize={pc==='Name' ? 'words' : 'none'}
        value={value}
        onChangeText={func}
        secureTextEntry={password}
        keyboardType={pc==='Email' ? 'email-address' : 'default'}
        maxLength={length}
        multiline={false}
      />
    </View>
  );
};

export default memo(Input);
