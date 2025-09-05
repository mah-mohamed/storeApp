export async function getWholeCart(req,res){
    try {
        const user = req.user
        const products = user.populate('cartItems.product')
        res.status(200).json(products)
    } catch (error) {
        console.log('error in gotWholeCart',error.message)
        res.status(400).json({message : error.message})
    }
}
export async function addCartProduct(req,res){
    try {
        const user = req.user
        const {productId} = req.body
        
        const alreadyThere = user.cartItems.find( item => item.product===productId)
        if(alreadyThere) {
            alreadyThere.quantity +=1
        }else{
            user.cartItems.push({productId})
        }
        await user.save()
        res.status(200).json(user.cartItems)
    } catch (error) {
        console.log('error in addCartProduct',error.message)
        res.status(400).json({message : error.message})
    }
}

export async function removeAllFromCart(req,res){
    const {productId} = req.body
    const user = req.user
    try {
        user.cartItems = await user.cartItems.filter(item => item.product !== productId)
        await user.save()
        res.status(200).json(user.cartItems)
    } catch (error) {
        console.log('error in deleteAllFromCart',error.message)
        res.status(400).json({message : error.message})
    }
}

export async function updateQuantity(req,res){
    const {productId , quantity} = req.body 
    const user = req.user
    try {
         if ( quantity ===0){
            user.cartItems = await user.cartItems.filter( item => item.product !== productId)
         }else{
            const product = await user.cartItems.find({productId})
            product.quantity = quantity
         }
         await user.save()
         res.status(200).json(user.cartItems)
        } catch (error) {
        console.log('error in updateQuantity',error.message)
        res.status(400).json({message : error.message})
    }    
}