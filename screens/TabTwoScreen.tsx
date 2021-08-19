import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Image} from '../components/Themed';

export default function TabTwoScreen() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('https://randomuser.me/api')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      (
        
        <View style={{ flex: 1, flexDirection: 'column'}}>
          {data.map(item => (
           <Text style={styles.title}>{item.name.title} {item.name.first} {item.name.last}</Text>
          ))}
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          {data.map(item => (
           <Text>Email: {item.email}</Text>
          ))}
          {data.map(item => (
           <Text>Age: {item.dob.age}</Text>
          ))}
          {data.map(item => (
           <Image source={{
            uri: item.picture.medium,
           }}/>
          ))}
        </View>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
