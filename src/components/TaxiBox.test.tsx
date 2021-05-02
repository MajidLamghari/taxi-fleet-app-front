import moment from 'moment'

describe('Testing price calculator function', () => {
    function PriceCalculator(distance:number, startTime:string) {
        let hour = moment(startTime).hours() - 1;
        let price = hour > 20 && hour < 6 ? 1+(distance/(1/5))*0.50 + 1.50 : (hour > 16 && hour < 19 ? 1+(distance/(1/5))*0.50 + 0.50 : 1+(distance/(1/5))*0.50);
        return price;
    }
  
    it('should equal 6',()=>{
       expect(PriceCalculator(2, "2020-06-19T13:01:17.031Z",)).toBe(6);
      })
  
    test('also should equal 6', () => {
        expect(PriceCalculator(2, "2020-06-19T13:01:17.031Z",)).toBe(6);
      }) 
  });