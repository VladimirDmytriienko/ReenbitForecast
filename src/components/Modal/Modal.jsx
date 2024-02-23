import { useState } from 'react';
import xIcon from'../../assets/X-icon.svg'
import './modal.css'

const cities = [
    {
        "city": "Dubai",
        "photo": "https://media.istockphoto.com/id/467829216/photo/dubai-marina.jpg?s=612x612&w=0&k=20&c=5KNh7wGSoP9i-UJzT-LtUfXgLHKKoBlPAK67R0LHRQY=",
    },
    {
        "city": "Tokyo",
        "photo": "https://media.istockphoto.com/id/516181902/photo/tokyo-city-skyline.jpg?s=612x612&w=0&k=20&c=ah1gHG4Ne_Figx_6Wn1Eh7RQBFjFPQh3t2qp4hdguLY=",

    },
    {
        "city": "Barcelona",
        "photo": "https://a.cdn-hotels.com/gdcs/production81/d1983/1441d9b5-d0e6-4230-9923-646d58ba66d8.jpg?impolicy=fcrop&w=800&h=533&q=medium",

    },
    {
        "city": "Paris",
        "photo": "https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.jpg?s=612x612&w=0&k=20&c=sFn6FwTJR0TpX3rP_W4VHrbkTB__6l5kr-lkkqdYrtE=",

    },
    {
        "city": "London",
        "photo": "https://media.istockphoto.com/id/1294454411/photo/london-symbols-with-big-ben-double-decker-buses-and-red-phone-booth-in-england-uk.jpg?s=612x612&w=0&k=20&c=IX4_XZC-_P60cq9ZZbxw1CbL68hlv1L5-r_vSgEfx4k=",

    },
    {
        "city": "Sydney",
        "photo": "https://media.istockphoto.com/id/1368846553/photo/d-syd-kir-circ-quay-ferry.jpg?s=612x612&w=0&k=20&c=FJlFL-QBQvBTITEjtEta6PlShqwIoiT0RtD-AuGYaz8=",
    },
    {
        "city": "Rome",
        "photo": "https://a.cdn-hotels.com/gdcs/production151/d623/a8b25d0d-64d5-402f-99f5-a58f483c38c6.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    },
    {
        "city": "Berlin",
        "photo": "https://media.istockphoto.com/id/503874284/photo/berlin-skyline-with-spree-river-at-sunset-germany.jpg?s=612x612&w=0&k=20&c=gnrw-SQQq9Niao93SU4djAgGXi-5LRBNkSRiwwX96Tk=",
    }
]

export default function Modal({ trips, setTrips }) {

    const [isOpen, setIsOpen] = useState(false);
    const [city, setCity] = useState('');
    const [changedDate, setChangedDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); 

    const handleModal = () => setIsOpen(!isOpen);


    const handleSubmit = (e) => {
        e.preventDefault();
        handleModal();
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
        setIsFormValid(!!e.target.value && !!changedDate && !!endDate); 
    };

    let today = new Date();

    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');

    let formattedDate = `${year}-${month}-${day}`;
    let newDate = new Date(today);
    newDate.setDate(today.getDate() + 15);
    let yearPlus = newDate.getFullYear();
    let monthPlus = String(newDate.getMonth() + 1).padStart(2, '0');
    let dayPlus = String(newDate.getDate()).padStart(2, '0');

    let formattedNewDate = `${yearPlus}-${monthPlus}-${dayPlus}`;

    const onChangeDate = e => {
        const choosenDate = e.target.value;
        const newDateObj = new Date(choosenDate);
        newDateObj.setDate(newDateObj.getDate() + 15);
        const newDateStr = newDateObj.toISOString().substring(0, 10);
        setMaxDate(newDateStr)
        setChangedDate(choosenDate);
        setIsFormValid(!!city && !!choosenDate && !!endDate);
    };
    const onChangeEndDate = e => {
        const choosenDate = e.target.value;
        setEndDate(choosenDate);
        setIsFormValid(!!city && !!changedDate && !!choosenDate); 
    };
    const handleSubmitTrip = () => {
        let foundIndex = -1;
        cities.forEach((item, index) => {
            if (item.city === city) {
                foundIndex = index;
            }
        });
        setTrips(prev => [
            ...prev,
            {
                'city': city,
                'photo': cities[foundIndex].photo,
                'changedDate': changedDate,
                'endDate': endDate
            }
        ])

    };


  return (
      <div>
          <button className='modal-toggler' onClick={handleModal}>Create Trip Modal</button>
          {isOpen && (
              <div className='modal'>
                  <div className="modal-overlay" onClick={handleModal}>
                      <div className='wrapper'>
                          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                              <div className="modal-header">
                                  <h3>Create trip</h3>
                                  <img src={xIcon} onClick={handleModal}  alt='close icon' />
                              </div>
                              <form onSubmit={handleSubmit} className="form">
                                  <select
                                      value={city}
                                      onChange={handleInputChange}
                                  >
                                      <option value="">Cities</option>
                                      {cities.map((cityObj, index) => (
                                          <option key={index} value={cityObj.city}>{cityObj.city}</option>
                                      ))}
                                  </select>
                                  <label htmlFor="startDate">Дата початку:</label>
                                  <input
                                      type="date"
                                      id="startDate"
                                      name="startDate"
                                      min={formattedDate}
                                      max={formattedNewDate}
                                      onChange={onChangeDate}
                                  />
                                  <label htmlFor="endDate">Дата закінчення:</label>
                                  <input
                                      type="date"
                                      id="endDate"
                                      name="endDate"
                                      min={changedDate}
                                      max={maxDate}
                                      onChange={onChangeEndDate}
                                  />
                                  <button type="submit" onClick={handleSubmitTrip} disabled={!isFormValid}>Створити</button>
                                  <button type="button" onClick={handleModal}>Скасувати</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>

          )}
      </div>

  )
}
