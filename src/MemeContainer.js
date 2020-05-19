import React from 'react'

class MemeContainer extends React.Component{
    // constructor(){
    //     super()
    //     this.state = { 
    //         topText: '',
    //         bottomText: '',
    //         randomImg: 'https://www.abc.net.au/cm/rimage/12008266-16x9-large.jpg?v=2',
    //         allMemes: [] 
    //     }
    // }

    state = { 
        topText: '',
        bottomText: '',
        randomImg: 'https://www.abc.net.au/cm/rimage/12008266-16x9-large.jpg?v=2',
        allMemes: [] 
    }
    
    
    FetchMemes = event =>{
        event.preventDefault();
        //update random image
        let rnd = Math.floor(Math.random() * this.state.allMemes.length)
        this.setState({randomImg:this.state.allMemes[rnd].url})
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({allMemes:memes})
                console.log(this.state.allMemes)
            })
        
            
    }

    onChangeInput = event =>{
        // if(event.target.name == 'topText'){
        //     console.log('TOPTEXT');
        // }
        const {name, value} = event.target
        this.setState({[name]:value})
        console.log(this.state.topText)
    }

    render(){
        return(
            <div className="meme-container">
                <form>
                    <label>Top</label>
                    <input
                        type="text"
                        name="topText"
                        onChange={this.onChangeInput}
                    />
                    
                    <label>Bottom</label>
                    <input
                        type="text"
                        name="bottomText"
                        onChange={this.onChangeInput}
                    />
                    
                    <button className="btn-gen" onClick={this.FetchMemes}>Generate</button>
                    <button className="btn-save">Save</button>
                </form>

                <div className="meme-image">
                    <img src={this.state.randomImg} alt="logo"/>
                    <h2 className='top-text'> {this.state.topText} </h2>
                    <h2 className='bottom-text'> {this.state.bottomText} </h2>
                </div>
            </div>
        )
    }
}

export default MemeContainer