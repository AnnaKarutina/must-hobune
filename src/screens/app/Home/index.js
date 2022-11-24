import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from "../../../components/Header";

import { categories } from '../../../data/categories';
import CategoryBox from "../../../components/CategoryBox";

import { products } from '../../../data/products';
import ProductHomeItem from "../../../components/ProductHomeItem";
import Button from "../../../components/Button";
import {UserContext} from "../../../../App";

const Home = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({name: user});
  const [selectedCategory, setSelectedCategory] = useState();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [keyword, setKeyword] = useState();
  console.log(keyword)

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedProducts = products.filter((product) => product?.category === selectedCategory);
      setFilteredProducts(updatedProducts);
    } else if (selectedCategory && keyword) {
      const updatedProducts = products.filter((product) => product?.category === selectedCategory && product?.title?.toLowerCase().includes(keyword?.toLowerCase()) );
      setFilteredProducts(updatedProducts);
    } else if (!selectedCategory && keyword) {
      const updatedProducts = products.filter((product) => product?.title?.toLowerCase().includes(keyword?.toLowerCase()) );
      setFilteredProducts(updatedProducts);
    } else if (!keyword && !selectedCategory) {
      setFilteredProducts();
    }
  }, [selectedCategory, keyword])

    const renderCategoryItem = ({ item, index }) => {
    //console.log(item)
    return (
      <CategoryBox
        onPress={() => setSelectedCategory(item?.id)}
        isSelected={item?.id === selectedCategory}
        title={item.title}
        image={item.image}
      />
    )
  }

  const renderProductItem = ({ item }) => {
    console.log(item)
    const onProductPress = (product) => {
      navigation.navigate('ProductDetails', { product })
    };

    return (
      <ProductHomeItem onPress={() => onProductPress(item)} {...item} />
    )
  }

  const onSubmit = () => {
    navigation.navigate('Signin')
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
      {/*<Header showSearch onSearch={setKeyword} keyword={keyword}  title="Find All You Need" />*/}
      <View>
        <Text style={styles.footerText}>
          {user}, soovid hinnata oma tuju?
        </Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => String(index)}
      />

      <FlatList
        numColumns={2}
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />

      <Button onPress={onSubmit} style={styles.button} title="Räägime Su päevast?"  />

      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(Home);
