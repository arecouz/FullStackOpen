import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 25,
    borderBottomWidth: 12,
    borderBottomColor: theme.colors.primary,
  },
  text: {
    marginBottom: 0,
  },
  description: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 10, // Add some space between the description and the rest
  },
  heading: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarAndBadgesContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure avatar and badges are vertically aligned
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1, // Make sure this view takes up the remaining space
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping onto new rows
    flex: 1,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1, // Ensure the badge grows to take up available space
    flexBasis: '20%', // Allow each badge to take up 20% of the row by default
    padding: 5,
    margin: 5, // Add margin to create space between badges
  },
  badgeText: {
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  const formatNumber = (n) => {
    if (n >= 1000 && n < 1000000) {
      return (n / 1000).toFixed(1) + 'k';
    } else if (n >= 1000000 && n < 1000000000) {
      return (n / 1000000).toFixed(1) + 'M';
    }
    return n.toString();
  };

  const getLanguageIcon = (language) => {
    switch (language) {
      case 'Python':
        return (
          <MaterialCommunityIcons
            name="language-python"
            size={24}
            color="black"
          />
        );
      case 'Ruby':
        return (
          <MaterialCommunityIcons
            name="language-ruby"
            size={24}
            color="black"
          />
        );
      case 'TypeScript':
        return (
          <MaterialCommunityIcons
            name="language-typescript"
            size={24}
            color="black"
          />
        );
      default:
        return language;
    }
  };

  return (
    <View style={styles.container}>
              <View style={styles.badge}>
          <Text style={styles.badgeText} fontWeight="bold">
            {getLanguageIcon(item.language)}
          </Text>
      <View style={styles.heading}>
        <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.avatarAndBadgesContainer}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatar}
            source={{
              uri: `${item.ownerAvatarUrl}`,
            }}
          />
          <Text>{item.fullName.split('/')[0]}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <AntDesign name="staro" size={24} color="black" />
            <Text style={styles.badgeText}>
              {formatNumber(item.stargazersCount)}
            </Text>
          </View>
          <View style={styles.badge}>
            <AntDesign name="fork" size={24} color="black" />
            <Text style={styles.badgeText}>
              {formatNumber(item.forksCount)}
            </Text>
          </View>
          <View style={styles.badge}>
            <FontAwesome5 name="comment" size={24} color="black" />
            <Text style={styles.badgeText}>{item.reviewCount}</Text>
          </View>
          <View style={styles.badge}>
            <Entypo name="bar-graph" size={24} color="black" />
            <Text style={styles.badgeText}>{item.ratingAverage}/100</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
