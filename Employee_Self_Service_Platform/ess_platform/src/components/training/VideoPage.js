import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
  
const VideoCard = () => {
      
    return(
         
        <Card style={Styles.container}>
        <Card.Content>
            <Title>Video ##</Title>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nebraskamed.com%2Fsites%2Fdefault%2Ffiles%2F2019-03%2FGettyImages-1067019704.jpg&f=1&nofb=1&ipt=49d496320c6bc14ac9a7e6ae3a682f411985827a011f1af99d23d695356f92ea&ipo=images' }} />
       <Card.Content>
        <Paragraph>Description for the video ##</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Play</Button>
        </Card.Actions>
      </Card>
         
    )
}
export default VideoCard;
  
const Styles = StyleSheet.create({
    container :{
        alignContent:'center',
        margin:37
    }
})