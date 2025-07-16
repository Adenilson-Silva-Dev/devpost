import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function PostList({ data, userId }) {
  const [likesPost, setLikesPost] = useState(data?.likes);


  function formatePostList() {
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  return (
    <View style={Styles.Container} activeOpacity={0.6}>
      <TouchableOpacity style={Styles.Header}>
        {data.avatarUrl ? (
          <Image style={Styles.Avatar} source={{ uri: data.avatarUrl }} />
        ) : (
          <Image style={Styles.Avatar} source={require('../../imgs/avatar.png')} />
        )}
        <Text style={Styles.Name} numberOfLines={1}>
          {data?.autor}
        </Text>
      </TouchableOpacity>

      <View style={Styles.ContentView}>
        <Text style={Styles.Content}>{data?.post}</Text>
      </View>

      <View style={Styles.Actions}>
        <TouchableOpacity style={Styles.LikeButton}>
          <Text style={{ color: '#e52246' }}>{likesPost}</Text>
          <Icon
            style={{ marginLeft: 6 }}
            name={likesPost === 0 ? 'heart-o' : 'heart'}
            size={20}
            color={'#e52246'}
          />
        </TouchableOpacity>
        <Text style={Styles.TimePost}>{formatePostList()}</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: '2%',
    borderRadius: 8,
    elevation: 3,
    padding: 11,
    backgroundColor: '#fff',
  },

  Header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  Avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 8,
  },

  Name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#353840',
  },
  Content: {
    color: '#353840',
  },

  Actions: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  LikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TimePost: {
    color: '#353840',
  },
});
export default PostList;
