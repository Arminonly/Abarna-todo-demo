import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import ListItem from './components/listItem'
library.add(faTrash)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: '',
        complited: false,
      },
    }
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.setUpdate = this.setUpdate.bind(this)
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    })
  }

  addItem(e) {
    e.preventDefault()
    const newItem = this.state.currentItem
    console.log(newItem)
    if (newItem !== '') {
      const newItems = [...this.state.items, newItem]
      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: '',
          complited: false,
        },
      })
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key)
    this.setState({ items: filteredItems })
  }

  setUpdate(text, key) {
    const items = this.state.items
    // eslint-disable-next-line
    items.map((item) => {
      if (item.key === key) {
        item.text = text
      }
      console.log(item.text)
    })
    this.setState({
      items: items,
    })
  }

  render() {
    const { currentItem } = this.state
    return (
      <div className="App">
        <header>
          <form onSubmit={this.addItem} id="to-do-form">
            <input
              type="text"
              placeholder="Add a todo"
              value={currentItem.text}
              onChange={this.handleInput}
            />
            <button type="submit">ADD</button>
          </form>
        </header>
        <ListItem
          setUpdate={this.setUpdate}
          deleteItem={this.deleteItem}
          items={this.state.items}
        />
      </div>
    )
  }
}

export default App
