import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SearchBar } from 'react-native-elements'

import Hotel from '../Components/Hotel'
import { getHotels, searchFilter } from '../Services/http'
import { setCurrentHotel } from '../Services/Actions'
import { SPINNER_URL } from '../config'

class HomeScreen extends Component{
    static navigationOptions = {
        title: 'Lista de hoteles',
    }
    
    constructor(props) {
      super(props)
      this.state = {
        text: ''
      }
      
      this.renderHotels = this.renderHotels.bind(this)
    }
    
    componentWillMount() {
      this.props.getHotels()
    }
    
    renderHotels(navigate) {
      if(this.props.isLoading) {
        return <View style={styles.container}>
          <Image source={{uri: SPINNER_URL}} />
        </View>
      } else if(_.isEmpty(this.props.hotels)) {
        return <Text style={[styles.container, styles.text]}>
          No se encontraron hoteles
        </Text>
      } else {
        return (this.props.hotels.map((hotel) => (
          <Hotel key={hotel.id} hotel={hotel} navigate={navigate} setCurrentHotel={this.props.setCurrentHotel} />
        )))
      }
    }

    render() {
      const handleChange = (text) => {
        // this.setState({ text: text })
        this.props.searchFilter(text)
      }
      
      const { navigate } = this.props.navigation
      return(
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          keyboardDismissMode='on-drag'>
          <SearchBar
            lightTheme
            onChangeText={(text) => handleChange(text)}
            // onClear={someMethod}
            placeholder='Buscar hotel'
            cancelButtonTitle="Cancelar" 
          />
          {this.renderHotels(navigate)}
        </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: 'white',
    marginTop:30
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  }
})

  
const mapStateToProps = state => ({
  hotels: state.hotels.filters,
  isLoading: state.hotels.isLoading
})


const mapDispatchToProps = dispatch => ({
  getHotels: () => dispatch(getHotels()),
  searchFilter: (search) => dispatch(searchFilter(search)),
  setCurrentHotel: (hotel) => dispatch(setCurrentHotel(hotel))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
  