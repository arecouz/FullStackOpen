import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  text: {
    marginBottom: 0,
  },
  description: {
    fontSize: theme.fontSizes.subheading,
    marginBottom: 5,
  },
  heading: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headingText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
  },
  avatarAndBadgesContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    flex: 1,

  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: '20%',
  },
  badgeText: {
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
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
            javaScript
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
      case 'JavaScript':
        return (
          <MaterialCommunityIcons
            name="language-javascript"
            size={24}
            color="black"
          />
        );
      case 'Java':
        return (
          <MaterialCommunityIcons
            name="language-java"
            size={24}
            color="black"
          />
        );
      default:
        return language;
    }
  };

  const [username, title] = item.fullName.split('/');

  return (
    <View style={styles.container} testID="repositoryItem">
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <View style={styles.badge}>
          <Text style={styles.badgeText} fontWeight="bold">
            {getLanguageIcon(item.language)}
          </Text>
          <Text style={styles.headingText}>{title}</Text>
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
            <Text>{username}</Text>
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
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
