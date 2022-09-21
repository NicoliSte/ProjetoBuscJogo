import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png';


import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';


import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discorDuoSelected, setDiscorDuoSelected] = useState('');

  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();

  }

  async function getDiscordUsers(adsId: string) {
    fetch(`http://192.168.1.6:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscorDuoSelected(data.discord));

  }

  useEffect(() => {
    fetch(`http://192.168.1.6:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.couver}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUsers(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[styles.contentList, duos.length === 0 && styles.empatyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}

        />

        <DuoMatch
          visible={discorDuoSelected.length > 0}
          discord={discorDuoSelected}
          onClose={() => setDiscorDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}