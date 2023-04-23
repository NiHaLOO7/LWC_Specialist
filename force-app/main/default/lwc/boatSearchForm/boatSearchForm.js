import { LightningElement, wire } from 'lwc';
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";

// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
      boatTypes({ error, data }) {
      if (data) {
        console.log(JSON.stringify(data));
        this.searchOptions = data.map(type => {
          // TODO: complete the logic
          return {
            label:type.Name,
            value:type.Id
        }  
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        console.log(JSON.stringify(error))
        this.searchOptions = undefined;
        this.error = error;
      }
    }


        // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        //  event.preventDefault();
        // Create the const searchEvent
        //const boatTypeId=event.detail.value;
        this.selectedBoatTypeId=event.detail.value;
        console.log('Selected Boat Type Id', this.selectedBoatTypeId);
        // searchEvent must be the new custom event search
        const searchEvent= new CustomEvent('search',{detail:this.selectedBoatTypeId});
       // const searchEvent = new CustomEvent('search', {        detail: { boatTypeId: this.selectedBoatTypeId }      });
        this.dispatchEvent(searchEvent);
      }
  }