import React from 'react'
import Note from './Note'
class Board extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            notes:[]
        }
this.eachNote =this.eachNote.bind(this)
this.update=this.update.bind(this)
this.remove=this.remove.bind(this)
this.nextId=this.nextId.bind(this)
this.add = this.add.bind(this)

    }
    componentWillMount(){
        var self = this
        if(this.props.count){

        }
    }
    add(text){
        this.setState(prevState=>({
            notes:[
                ...prevState.notes,
                {
                    id:this.nextId(),
                    note:text
                }
            ]
        }))
    }
    nextId() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    update(newText,i){ 
        console.log('updating',i,newText)
        this.setState(prevState=>({
            notes: prevState.notes.map(
                note=>(note.id!==i)? note : {...note,note:newText}
            )
        }))
       
    }
   
    remove(id){
        console.log('removing',id)
        this.setState(prevState=>({
            notes: prevState.notes.filter(note=>note.id!==id)
        }))
    }
    eachNote(note,i){
        return( 
            <Note key={note.id}
            index={note.id}
            onChange={this.update}
            onRemove={this.remove}>
            {note.note}
            </Note>
        )
    }
    render(){
        return(
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button onClick={this.add.bind(null,"new note")} id="add">ADD NEW</button>
            </div>
        )
    }
}

export default Board;