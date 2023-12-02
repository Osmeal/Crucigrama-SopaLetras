import React, { useState, useEffect } from 'react';
import { TextInput, Text, ScrollView, View } from 'react-native';
import axios from 'axios';
import { TouchableHighlight } from 'react-native';

export default function Screen1() {
  const view2 = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];

  const view3 = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const view4 = [
    { id: 21 },
    { id: 22 },
    { id: 23 },
  ];

  const view5 = [
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
  ];

  const arraySoftware = ['S', 'O', 'F', 'T', 'W', 'A', 'R', 'E'];
  const arrayDeveloper = ['D', 'E', 'V', 'E', 'L', 'O', 'P', 'E', 'R'];
  const arraySystem = ['S', 'Y', 'S', 'T', 'E', 'M'];
  const arrayApp = ['A', 'P', 'P'];
  const arrayFramework = ['F', 'R', 'A', 'M', 'E', 'W', 'O', 'R', 'K'];

  const [valorEntrada1, setValorEntrada1] = useState(['', '', '', '', '', '', '']);
  const [valorEntrada2, setValorEntrada2] = useState(['', '', '', '', '', '', '', '', '']);
  const [valorEntrada3, setValorEntrada3] = useState(['', '', '', '', '', '']);
  const [valorEntrada4, setValorEntrada4] = useState(['', '', '']);
  const [valorEntrada5, setValorEntrada5] = useState(['', '', '', '', '', '', '', '', '']);

  const [definiciones, setDefiniciones] = useState({});


  const establecerDefiniciones = async () => {
    const palabrasAConsultar = ["software", "developer", "system", "app", "framework"];
    const definiciones = {};

    for (const palabra of palabrasAConsultar) {
      try {
        const respuesta = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${palabra}`);
        const definicionPalabra = respuesta.data[0]?.meanings[0]?.definitions[0]?.definition;
        definiciones[palabra] = definicionPalabra || `No se encontró definición para ${palabra}`;
      } catch (error) {
        definiciones[palabra] = `Error al obtener la definición de ${palabra}`;
        console.error(`Error al obtener la definición de ${palabra}:`, error);
      }
    }

    setDefiniciones(definiciones);
  };



  const compararArrays = (views, setValor, arrayComparar) => {
    const arrays = {
      view1: valorEntrada1,
      view2: valorEntrada2,
      view3: valorEntrada3,
      view4: valorEntrada4,
      view5: valorEntrada5,
    };

    const newArray = arrays[views].map((element, index) => {
      if (arrays[views][index] !== arrayComparar[index]) {
        return '';
      }
      return element;
    });

    setValor(newArray);
  };

  const establecerArray = (text, index, setValorEntrada) => {
    const actualizaValorEntrada = setValorEntrada((valor) =>
      valor.map((item, i) => (i === index ? text : item))
    );
    return actualizaValorEntrada;
  };


  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
      }}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => establecerDefiniciones()}>
        <Text style={{ fontSize: 40, marginVertical: 20, fontWeight: 'bold' }}>Crucigrama</Text>
      </TouchableHighlight>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 134 }}></View>
                <View style={{ width: 16 }}>
                  <Text style={{ fontSize: 20 }} onPress={() => compararArrays('view1', setValorEntrada1, arraySoftware) + compararArrays('view2', setValorEntrada2, arrayDeveloper) + compararArrays('view3', setValorEntrada3, arraySystem) + compararArrays('view4', setValorEntrada4, arrayApp) + compararArrays('view5', setValorEntrada5, arrayFramework)}>
                    1</Text>
                </View>
                <View style={{ padding: 2, borderWidth: 1, height: 34 }}>
                  <TextInput
                    size="20"
                    onChangeText={(text) => establecerArray(text, 0, setValorEntrada1)}
                    value={valorEntrada1[0]} />
                </View>

              </View>


              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 16 }}>
                  <Text style={{ fontSize: 20 }} onPress={() => compararArrays('view2', setValorEntrada2, arrayDeveloper)}>2</Text>
                </View>

                {view2.map((view, index) => (
                  <View key={view.id} style={{ padding: 2, borderWidth: 1, height: 34 }}>
                    <TextInput
                      size="20"
                      onChangeText={(text) => establecerArray(text, index, setValorEntrada2)}
                      value={valorEntrada2[index]} />
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 150 }}></View>
                <View style={{ padding: 2, borderWidth: 1, height: 34 }}>
                  <TextInput
                    size="20"
                    onChangeText={(text) => establecerArray(text, 2, setValorEntrada1)}
                    value={valorEntrada1[2]} />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 54 }}></View>
                <View style={{ width: 16 }}>
                  <Text style={{ fontSize: 20 }} onPress={() => compararArrays('view3', setValorEntrada3, arraySystem)}>3</Text>
                </View>

                {view3.map((view, index) => (
                  <View key={view.id} style={{ padding: 2, borderWidth: 1, height: 34 }}>
                    <TextInput
                      size="20"
                      onChangeText={(text) => establecerArray(text, index, setValorEntrada3)}
                      value={valorEntrada3[index]} />
                  </View>
                ))}
                <View style={{ width: 64 }}></View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 150 }}></View>
                <View style={{ padding: 2, borderWidth: 1, height: 34 }}>
                  <TextInput
                    size="20"
                    onChangeText={(text) => establecerArray(text, 4, setValorEntrada1)}
                    value={valorEntrada1[4]} />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 134 }}></View>
                <View style={{ width: 16 }}>
                  <Text style={{ fontSize: 20 }} onPress={() => compararArrays('view4', setValorEntrada4, arrayApp)}>4</Text>
                </View>

                {view4.map((view, index) => (
                  <View key={view.id} style={{ padding: 2, borderWidth: 1, height: 34 }}>
                    <TextInput
                      size="20"
                      onChangeText={(text) => establecerArray(text, index, setValorEntrada4)}
                      value={valorEntrada4[index]} />
                  </View>
                ))}
                <View style={{ width: 64 }}></View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 150 }}></View>
                <View style={{ padding: 2, borderWidth: 1, height: 34 }}>
                  <TextInput
                    size="20"
                    onChangeText={(text) => establecerArray(text, 6, setValorEntrada1)}
                    value={valorEntrada1[6]} />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 27 }}></View>
                <View style={{ width: 16 }}>
                  <Text style={{ fontSize: 20 }} onPress={() => compararArrays('view5', setValorEntrada5, arrayFramework)}>5</Text>
                </View>

                {view5.map((view, index) => (
                  <View key={view.id} style={{ padding: 2, borderWidth: 1, height: 34 }}>
                    <TextInput
                      size="20"
                      onChangeText={(text) => establecerArray(text, index, setValorEntrada5)}
                      value={valorEntrada5[index]} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={{ height: 27 }}></View>
          <Text
            style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>
            Definitions
          </Text>

          <Text>1. {definiciones["software"]}</Text>
          <Text>2. {definiciones["developer"]}</Text>
          <Text>3. {definiciones["system"]}</Text>
          <Text>4. {definiciones["app"]}</Text>
          <Text>5. {definiciones["framework"]}</Text>
        </ScrollView>
      </View>
    </View>
  );
}
