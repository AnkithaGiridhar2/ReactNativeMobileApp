import { Pressable, StyleSheet,Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function IconButton({ icon, color, size, onPress,title }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} color={color} size={size} />
      <Text>{title}</Text>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
