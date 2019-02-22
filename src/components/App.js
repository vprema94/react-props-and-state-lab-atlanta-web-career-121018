import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { timingSafeEqual } from 'crypto';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
     this.setState({
        filters: { ...this.state.filters,
                  type: e.target.value}
     })
  } 

  onFindPetsClick = () => {
   if (this.state.filters.type === 'all') {
      fetch(`/api/pets`).then(res => res.json()).then((pets) => this.setState({pets}))
   } else {
      fetch(`/api/pets?type=${this.state.filters.type}`).then(res => res.json()).then((pets) => this.setState({pets: pets}))
   }

  } 

  onAdoptPet = (id) => {
   const newPets = this.state.pets.map(pet => {
      if (pet.id === id) {
         return { ...pet, isAdopted: true}
      } else {
         return pet
      }
   }) 
   this.setState({pets: newPets})
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
