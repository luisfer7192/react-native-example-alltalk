import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { Rating } from 'react-native-elements'

import Card from './Card'
import CardSection from './CardSection'
import Button from './Button'

// const AlbumDetail = ({ hotel, navigate }) => {
class AlbumDetail extends Component{
  constructor(props) {
    super(props)

    this.goToHotel = this.goToHotel.bind(this)
    console.disableYellowBox = true // to hide warning messages deprecate at development
  }
  
  goToHotel(hotel) {
    this.props.navigate('Second')
    this.props.setCurrentHotel(hotel)
  }
  
  render() {
    const createStars = (stars) => {
      return <Rating
        type="star"
        fractions={1}
        startingValue={stars}
        imageSize={15}
      />
    }
    
    const { hotel } = this.props
    const { name, price, image, stars } = hotel
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
      marginBottomStyle
    } = styles
    
    return (
      <Card>
        <CardSection>
          <TouchableHighlight onPress={() => this.goToHotel(hotel)} style={imageStyle}>
            <Image
              style={imageStyle}
              source={{ uri: image }}
            />
          </TouchableHighlight>
        </CardSection>

        <CardSection>
          <View style={listStyle}>
            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>{name}</Text>
              <View style={[marginTopStyle, marginBottomStyle]}>{createStars(stars)}</View>
            </View>
            <View style={[headerContentStyle, alingRigthStyle]}>
              <Text style={pricePerNightStyle}>Precio Por Noche</Text>
              <Text style={[priceStyle, marginTopStyle, marginBottomStyle]}>ARS: {price}</Text>
            </View>
          </View>
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
    height: 300,
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
  }
})

export default AlbumDetail;
