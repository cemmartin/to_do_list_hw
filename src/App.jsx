import { useState } from 'react'
import './App.css'

function App() {

  const [items, setItems] = useState([
    {name: "Buy shopping", isComplete: false, priority: "high"},
    {name: "Clean bathroom", isComplete: true, priotity: "low"},
    {name: "Car's MOT", isComplete: false, priority: "high"},
  ]);

  const [newItem, setNewItem] = useState("")

  const itemList = items.map((item, index) => {
    return(
      <li key={index} className={item.isComplete ? "complete" : "incomplete"}>
        <span>{item.name}</span>
        {item.isComplete ? <span className='complete'>Complete!</span> : 
        <button onClick={() => completeItem(index)}>Incomplete</button>}
      </li>
    )
  })

  const handleItemInput = (event) => {
    setNewItem(event.target.value)
  }

  /*const handlePrioritySelect = (evt) => {
    setPriority{evt.target.value};
  }
  */

  const saveNewItem = (event) => { //saves new items
    event.preventDefault(); //this prevents HTML from making a post request when we submit (hence losing out state)
    const copyItems = [...items] //copies out existing array
    copyItems.push({name: newItem, isComplete: false, /*priority: priority*/}) //push- creates a new obj (named newItem); each item starts as false by default
    setItems(copyItems)
    setNewItem("") //sets it back to an empty string --> clears the form for the next submission
  }

  const completeItem = (index) => {
    const copyItems = [...items] //copies items in state (to prevent mutation!) //find the updated item in the array using the index
    const updatedItem = {...copyItems[index]} //copy individual item
    updatedItem.isComplete = true //changes the property to true
    copyItems[index] = updatedItem // set copied items in state with the function provided by useState
    setItems(copyItems)
  }

  // const priority


  return (
    <div className="App">
      <h1>To Do List</h1>
      <form onSubmit={saveNewItem}>
        <label htmlFor="new-item"></label>
        <input id="new-item" type="text" value={newItem} onChange={handleItemInput} />
        
        <label /*htmlFor="high"*/ class="radioBtn">High
          <input /*id="high*/ type="radio"  name="radio" /*checked={priority === "high"} value="high" onChange={handlePrioritySelect} required*//>
          <span class="checkmark"></span>
        </label>
        <label class="radioBtn">Low
          <input /*id="low*/ type="radio"  name="radio" /*value="low" onChange={handlePriority*/ />
          <span class="checkmark"></span>
        </label>
        <input type="submit" value="Save Item" />
      </form>

      <ul>
        {itemList}
      </ul>
    </div>
  )
}

export default App
