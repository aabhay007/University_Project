
import {connect} from 'react-redux'
import {addToCart} from '../services/action/Action.js'
import TestHome from '../components/TestHome.js'

const mapStateToProps=state=>({
    // data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(TestHome)