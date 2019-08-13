import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Icon, Rating } from 'react-native-elements'

import Card from '../Components/Card'
import CardSection from '../Components/CardSection'
import Button from '../Components/Button'
import { MAP_IMAGE } from '../config'

class SecondScreen extends Component{
    static navigationOptions = {
        title: 'Detalle del hotel',
    };
    
    constructor(){
      super();
    }

    render(){
      const createStars = (stars) => {
        return <Rating
          type="star"
          fractions={1}
          startingValue={stars}
          imageSize={15}
        />
      }
      
      const { name, price, image, stars } = this.props.hotel
      const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        listStyle,
        alingRigthStyle,
        pricePerNightStyle,
        priceStyle,
        marginTopStyle,
        marginBottomStyle,
        dirText
      } = styles
      
      return(
        <Card>
          <CardSection>
            <View style={listStyle}>
              <View style={headerContentStyle}>
                <Text style={headerTextStyle}>{name}</Text>
                <View style={[marginTopStyle, marginBottomStyle]}>{createStars(stars)}</View>
              </View>
            </View>
          </CardSection>
          
          <CardSection>
            <View style={[listStyle, dirText]}>
              <Icon
                name='map-pin'
                type='feather'
              />
              <Text style={dirText}>Carrera de paris 28, 100873</Text>
            </View>
          </CardSection>
          
          <CardSection>
            <Image
              style={imageStyle}
              source={{ uri: MAP_IMAGE }}
            />
          </CardSection>
        </Card>
      )
    }
}

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 160,
    marginTop: 10
  },
  headerTextStyle: {
    fontSize: 15
  },
  pricePerNightStyle: {
    fontSize: 10,
    color: '#bfb9b9'
  },
  priceStyle: {
    color: '#d6c15c'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 150,
    flex: 1,
    width: null
  },
  starIcon: {
    maxWidth: 22
  },
  listStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  alingRigthStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  marginTopStyle: {
    marginTop: 10
  },
  marginBottomStyle: {
    marginBottom: 10
  },
  dirText: {
    marginLeft: 10,
    marginRight: 10
  }
})

const mapStateToProps = state => ({
  hotel: state.hotels.currentHotel
})
  
export default connect(mapStateToProps)(SecondScreen)