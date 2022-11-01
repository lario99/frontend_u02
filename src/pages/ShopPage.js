import React from 'react';
import Timer from '../components/Timer';
import ShopTile from '../components/ShopTile';
import SlideDialog from '../components/SlideDialog';
import AddShopDialog from '../components/AddShopDialog';

class ShopPage extends React.Component {


    constructor(props) {
        super(props);
        const date = new Date();
        let initValue = 0;
        let maxValue = 0;
        props.shops.map((e) => {
            initValue += (e.initValue ?? 0);
            maxValue += (e.maxValue ?? 0);

        })
        this.state = {
            seconds: date.getTime() / 1000,
            shops: props.shops,
            value: initValue,
            maxValue: maxValue,
            dialogOpen: false,
            dialogTitle: '',
            dialogContent: '',
            addShopOpen: false
        }
        this.shopOverview = React.createRef();
        this.updateShopCount = this.updateShopCount.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleAddShopOpen = this.handleAddShopOpen.bind(this);
        this.handleAddShopClose = this.handleAddShopClose.bind(this);
        this.addShop = this.addShop.bind(this);
    }


    updateShopCount() {
        let newValue = this.state.value + 1;
        this.setState({
            value: newValue
        });


        this.updateShopOverview(newValue);
    }


    updateShopOverview = (count) => {
        this.shopOverview.current.forceUpdateCount(count);
    };



    handleDialogOpen(title, content) {
        this.setState({
            dialogTitle: title,
            dialogContent: content,
            dialogOpen: true,
        })
    }


    handleDialogClose() {
        this.setState({
            dialogOpen: false
        })
    }

    handleAddShopOpen() {
        this.setState({
            addShopOpen: true,
        })
    }


    handleAddShopClose() {
        this.setState({
            addShopOpen: false
        })
    }

    addShop(shop){
        this.setState({
            shops: [...this.state.shops,shop],
            maxValue: this.state.maxValue + shop.maxValue
        })

        this.shopOverview.current.setState({
                maxValue: this.state.maxValue + shop.maxValue
        });

    }



    render() {
        return (
            <div>
                <ShopTile ref={this.shopOverview} shop={{ initValue: this.state.value, maxValue: this.state.maxValue, title: 'Celkovy pocet nakupujicich' }} enabled={false} showDialog={this.handleAddShopOpen}/>
                <Timer seconds={this.state.seconds} />
                {this.state.shops.map((entry, index) => (
                    <ShopTile shop={entry} key={index} update={() => this.updateShopCount()} seconds={this.state.seconds} showDialog={this.handleDialogOpen} />
                ))}

                <SlideDialog open={this.state.dialogOpen} title={this.state.dialogTitle} content={this.state.dialogContent} handleDialogClose={this.handleDialogClose} />
                <AddShopDialog open={this.state.addShopOpen} handleDialogClose={this.handleAddShopClose} save={this.addShop} />
            </div>
        );
    }

}

export default ShopPage;