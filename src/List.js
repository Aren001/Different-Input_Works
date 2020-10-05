import React from 'react';

import './style.css';



const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };



class List extends React.Component {

    constructor(){
        super();
        this.state={
            dataArr:[],

            price:0,
            minPrice: 0,
            maxPrice: 0,

            maxSize:0,
            minSize:0,

            select:'SELECT',
            selectB:'SELECT',
            capacity:1,
            inputS:'',

            breakfast: false,
            pets: false,

            sortedArr:[],
            dav:true


        }
        this.fetchs=this.fetchs.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handlChangeSelect=this.handlChangeSelect.bind(this);
    }


    

    



    componentDidMount(){
      

        this.fetchs();
        

    }


    fetchs(){

        fetch('https://run.mocky.io/v3/ca044526-8552-4412-97f0-3d7e19ce22bb')
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            this.setState({
                dataArr:data.arr,


            },()=>this.sorted())
        })
        

    }


    sorted=() => {
        
        let maxPrice = Math.max(...this.state.dataArr.map(item => item.price))

        let maxSize = Math.max(...this.state.dataArr.map(item => item.size));

        

        console.log(maxPrice)

        this.setState({
            price:maxPrice,
            maxPrice:maxPrice,
            maxSize:maxSize,
            dav:true
        })

        console.log(this.state.dataArr,'kkk')

    }


    filter = () => {

        let sorTed = [...this.state.dataArr];

        console.log(sorTed,'lll')

        //price
        sorTed = sorTed.filter(room => room.price <= this.state.price);

        //size
        sorTed = sorTed.filter(
            room => room.size >= this.state.minSize && room.size <= this.state.maxSize
          );


        //room  QUANTITY

        // if (this.state.capacity !== 1) {
        //     sorTed = sorTed.filter(room => room.capacity >= this.state.capacity);
        //   }

          //breakfast

          if (this.state.breakfast) {
            sorTed = sorTed.filter(room => room.breakfast === true);
          }
          //filter by pets
          if (this.state.pets) {
            sorTed = sorTed.filter(room => room.pets === true);
          }

          //SELECT
          if(this.state.select!=='SELECT'){
            sorTed = sorTed.filter(room => room.slug==this.state.select )
          }
          if(this.state.select!=='SELECT'&&this.state.selectB!=='SELECT'){
            sorTed = sorTed.filter(room => room.type==this.state.selectB )
          }

          //SEARCH
          if(this.state.inputS){
            sorTed = sorTed.filter(room => room.capacity==this.state.inputS )
          }

        this.setState({
            dav:false,
            sortedArr:sorTed
        })
    }


    handleChange = (e) => {

      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;  
      const name = target.name;
     this.setState({ 
        [name]:value,
     },() => this.filter())
    }




    handlChangeSelect(e){
      this.setState({
        selectB:'SELECT',
        select:e.target.value,
      },() => this.filter() )
  }


 
  handlChangeSelectB=(e) => {
    this.setState({
      selectB:e.target.value
    },() => this.filter() )
  }







    render(){

        // console.log(this.state.price,'kkkkk')

        return (
            <div>


              {/* ----------O
              O------------- */}


                <div className="form-group">
          <label htmlFor="price">room price ${this.state.price}</label>
          <input
            type="range"
            name="price"
            min={this.state.minPrice}
            max={this.state.maxPrice}
            value={this.state.price}
            onChange={this.handleChange}
            className="form-control"
            style={{width:'350px',height:'20px'}}
          />
             </div>


            {/* MIN---MAX */}


             <div className="form-group">
          <label htmlFor="price">room size </label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={this.state.minSize}
              onChange={this.handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={this.state.maxSize}
              onChange={this.handleChange}
              className="size-input"
            />
          </div>
        </div>



          {/* CHECKBOX */}
       
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              
              checked={this.state.breakfast}
              onChange={this.handleChange}
            />
            <label >breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              checked={this.state.pets}
              onChange={this.handleChange}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div>


          {/* SELECT */}


        <div>
            <select value={this.state.select} onChange={this.handlChangeSelect}>
                <option name='SELECT' value="SELECT">SELECT</option>
                <option name='MB' value="MB" >MB</option>
                <option name='BMW' value="BMW">BMW</option>
            </select>
        </div>

        
          
          <div>
            <select value={this.state.selectB} onChange={this.handlChangeSelect} disabled={this.state.select=="SELECT"}  >
                <option name='SELECT' value="SELECT">SELECT</option>
                <option name='A' value="A"  >A</option>
                <option name='B' value="B">B</option>
                <option name='C' value="C">C</option>
                <option name='S' value="S">S</option>
                <option name='F13' value="F13">F13</option>
            </select>
        </div>


        {/* SEARCH */}
        <div>
          <input type='text' placeholder='SEARCH' name="inputS" value={this.state.inputS} onChange={this.handleChange}  />
        </div>
        



            
            {
                this.state.dav ? 
                this.state.dataArr.map(item => {
                    return(
                        <div style={{display:'flex'}} key={item.id}>
                        <ul  style={{margin:'25px'}} >
                <li> {item.id} </li>
                <li> {item.name} </li>
                <li> {item.price} </li>
                </ul>
                        </div>
                
                    )
                
                })
                :
                this.state.sortedArr.map(item => {
                    return(
                        <div style={{display:'flex'}} key={item.id}>
                        <ul  style={{margin:'25px'}} >
                <li> {item.id} </li>
                <li> {item.name} </li>
                <li> {item.price} </li>
                </ul>
                        </div>
                
                    )
                
                })
            }







        



            </div>
        )

            


            
         
    }
}
export default List;







