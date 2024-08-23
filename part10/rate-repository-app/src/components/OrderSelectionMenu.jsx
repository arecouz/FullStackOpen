import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  pickerStyles: { 
    color: 'white',
    width: '60%' }
});

const OrderSelectionMenu = ({selectedOrder, setSelectedOrder }) => {

  return (
    <View style={styles.container}>
      <Picker
        mode={'dropdown'}
        dropdownIconColor={'white'}
        style={styles.pickerStyles}
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label="latest" value="latest" />
        <Picker.Item label="highest rated" value="highestRated" />
        <Picker.Item label="lowest rated" value="lowestRated" />
      </Picker>
    </View>
  );
};

export default OrderSelectionMenu;
