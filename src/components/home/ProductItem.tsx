import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/constants';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type ProductItemProps = {
  item: any;
  favFunc: () => void;
  favorites: any;
  navigation: any;
};

const {width, height} = Dimensions.get('window');

const ProductItem: React.FC<ProductItemProps> = ({item,favFunc,favorites,navigation}) => {
  const goProductPage = () => {
    navigation.navigate('ProductPage', {state: item});
  };

  return (
    <Pressable onPress={goProductPage}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: item?.thumbnail ?? item?.images[0]}}
          style={styles.imgBackground}>
          <View style={styles.rating}>
            <View style={{flexDirection: 'row', width: 32, gap: 4}}>
              <FontAwesomeIcon name="star" color={colors.pink} size={18} />
              <Text>{item.rating}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.cardInner}>
          <Text numberOfLines={1} style={[styles.nText]}>
            {item.title}
          </Text>
          <View style={styles.cardIn}>
            <Text style={[styles.nText2, {paddingVertical: 2}]}>
              ${item.price}
            </Text>
            <Pressable
              onPress={favFunc}
              style={({pressed}) => pressed && {opacity: 0.7}}>
              <FontAwesomeIcon
                name={favorites.includes(item.id) ? 'heart' : 'heart-o'}
                size={24}
                color={colors.pink}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;
const styles = StyleSheet.create({
  container: {
    boxShadow: '0 .5 2.5 .5 #00000015',
    borderRadius: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  nText: {
    fontFamily: 'Nunito',
    fontSize: 16,
  },
  nText2: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '700',
  },
  imgBackground: {
    width: width * 0.41,
    height: height * 0.17,
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6,
  },
  cardInner: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: width * 0.4,
  },
  cardIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingTop: 6,
    paddingHorizontal: 2,
  },
  rating: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 6,
    width: width * 0.41,
  },
});
