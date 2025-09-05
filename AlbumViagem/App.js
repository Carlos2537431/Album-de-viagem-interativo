import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';

const lugaresIniciais = [
  { id: '1', cidade: 'Paris', pais: 'França', img: 'https://picsum.photos/300/200?16' },
  { id: '2', cidade: 'Tóquio', pais: 'Japão', img: 'https://picsum.photos/300/200?17' },
  { id: '3', cidade: 'Rio de Janeiro', pais: 'Brasil', img: 'https://picsum.photos/300/200?18' },
];

export default function App() {
  const [lugares, setLugares] = useState(lugaresIniciais);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [paisSelecionado, setPaisSelecionado] = useState('');
  const [imgSelecionada, setImgSelecionada] = useState('');
  const [adicionarModalVisible, setAdicionarModalVisible] = useState(false);

  const adicionarLugar = () => {
    if (cidadeSelecionada && paisSelecionado && imgSelecionada) {
      const novoLugar = {
        id: (lugares.length + 1).toString(),
        cidade: cidadeSelecionada,
        pais: paisSelecionado,
        img: imgSelecionada,
      };
      setLugares([...lugares, novoLugar]);
      setAdicionarModalVisible(false);
      setCidadeSelecionada('');
      setPaisSelecionado('');
      setImgSelecionada('');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos para adicionar um lugar.');
    }
  };

  const removerLugar = (id) => {
    setLugares(lugares.filter((lugar) => lugar.id !== id));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Álbum de Viagem</Text>

      {/* FlatList */}
      <FlatList
        data={lugares}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setImagemSelecionada(item.img);
              setModalVisible(true);
            }}
          >
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.cidade}</Text>
              <Text style={styles.cardSubtitle}>{item.pais}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal para detalhes */}
<Modal visible={modalVisible} transparent={true}>
  <View style={styles.modalView}>
    <Image source={{ uri: imagemSelecionada }} style={styles.modalImage} />
    <Button title="Fechar" onPress={() => setModalVisible(false)} />
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => {
        removerLugar(imagemSelecionada);
      }}
    >
      <Text style={styles.removeButtonText}>Remover Lugar</Text>
    </TouchableOpacity>
  </View>
</Modal>

      {/* Modal para adicionar lugar */}
      <Modal visible={adicionarModalVisible} transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Adicionar Novo Lugar</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidadeSelecionada}
            onChangeText={setCidadeSelecionada}
          />
          <TextInput
            style={styles.input}
            placeholder="País"
            value={paisSelecionado}
            onChangeText={setPaisSelecionado}
          />
          <TextInput
            style={styles.input}
            placeholder="URL da Imagem"
            value={imgSelecionada}
            onChangeText={setImgSelecionada}
          />
          <Button title="Adicionar" onPress={adicionarLugar} />
          <Button title="Cancelar" color="red" onPress={() => setAdicionarModalVisible(false)} />
        </View>
      </Modal>

      {/* Botão para abrir o modal de adicionar lugar */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAdicionarModalVisible(true)}>
  <Text style={styles.addButtonText}>+ Adicionar Lugar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#4CAF50', // Verde moderno
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordas arredondadas
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Centraliza o botão
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  addButtonText: {
    color: '#fff', // Texto branco
    fontSize: 16,
    fontWeight: '600', // Peso médio
    textTransform: 'uppercase', // Texto em maiúsculas
    letterSpacing: 1, // Espaçamento entre letras
  },
  removeButton: {
    backgroundColor: '#ff4d4d', // Vermelho para destacar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordas arredondadas
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  removeButtonText: {
    color: '#fff', // Texto branco
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});