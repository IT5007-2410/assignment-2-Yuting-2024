/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
    email: 'jack@outlook.com',    
    birthdate: '1998-01-01',

  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
    email: 'rose@outlook.com',    
    birthdate: '1982-02-02',
    
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  console.log("row:", props.traveller);
  const traveller = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
      <td>{traveller.email}</td>      
      <td>{traveller.birthdate}</td>    

    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellerRows = props.travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Email</th>          
          <th>Birthdate</th>   

        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;      
    const name = form.travellername.value.trim(); 
    const birthdate = form.birthdate.value.trim(); 
    if (!name || !birthdate) { 
      alert('Please input valid name and birthdate'); 
      return; 
    } 

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputBirthdate = new Date(birthdate);
    inputBirthdate.setHours(0, 0, 0, 0);
    if (inputBirthdate > today) {
      alert('Please input valid name and birthdate,birthdate should not be  later than today');
      return;
    }

    const passenger = {
      name: name, 
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      birthdate: birthdate, 
    };    
    this.props.bookTraveller(passenger);    
    form.travellername.value = '';
    form.phone.value = '';
    form.email.value = '';    
    form.birthdate.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required/>
        <input type="text" name="phone" placeholder="Phone" />
        <input type="text" name="email" placeholder="Email" />        
        <input type="date" name="birthdate" placeholder="Birthdate"required/>  
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;    
    const passenger = {
    name: form.travellername.value,
    id: parseInt(form.travellerid.value, 10),
    };

    this.props.deleteTraveller(passenger);
    form.travellername.value = '';
    form.travellerid.value = '';  

  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
  <input type="number" name="travellerid" placeholder="ID" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	      <h2>Seat Availability</h2>
        <div className="seats">
          {[...Array(10)].map((e, i) => {
            const isOccupied = i < this.props.travellers.length; // check if seat is occupied
            return (
              <button
                key={i}
                style={{
                  backgroundColor: isOccupied ? 'grey' : 'green',
                  margin: '5px',
                  width: '30px',
                  height: '30px',
                }}
              >
                
              </button>
            );
          })}
        </div>
        <p>Total Occupied Seats: {this.props.travellers.length}</p> 
        <p>Total Free Seats: {10 - this.props.travellers.length}</p>
        <p>Total Seats: {10}</p>
  </div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      if (this.state.travellers.length >= 10) { // 
        alert('Add failed. All seats are occupied. Cannot add more travellers.');
        return;
      }
      const maxId = this.state.travellers.reduce((max, traveller) => (traveller.id > max ? traveller.id : max), 0);
      passenger.id = maxId + 1;
      passenger.bookingTime = new Date();
      this.setState(prevState => {
        const newTravellers = [...prevState.travellers, passenger];
        console.log('New travellers:', newTravellers); // to see if works
        return { travellers: newTravellers };
      }, () => {
        alert('Add successfully.'); // notice after state is updated
      });
      
    }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    if (this.state.travellers.length === 0) { 
      alert('All seats are empty. No passengers can be deleted.');
      return;
    }
    const travellerExists = this.state.travellers.some(
      traveller => traveller.name === passenger.name && traveller.id === passenger.id 
      );

      if (travellerExists) { 
        this.setState(prevState => ({ 
          travellers: prevState.travellers.filter( 
            traveller => !(traveller.name === passenger.name && traveller.id === passenger.id) 
          ), 
        })); 
        alert('Deleted successfully'); 
      } else { 
        alert('Delete failed, please input valid Name and Id'); 
      }
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        <button onClick={() => this.setSelector(1)}>Homepage</button>
        <button onClick={() => this.setSelector(2)}>Display Travellers</button>
        <button onClick={() => this.setSelector(3)}>Add Traveller</button>
        <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
    {this.state.selector === 1 && (<Homepage travellers={this.state.travellers} />)}
		{/*Q3. Code to call component that Displays Travellers.*/}
		{this.state.selector === 2 && (<Display travellers={this.state.travellers} />)}
		{/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector === 3 && (<Add bookTraveller={this.bookTraveller} />)}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
	  {this.state.selector === 4 && (<Delete deleteTraveller={this.deleteTraveller} />)}
  </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
