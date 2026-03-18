import ServiceDetailPage from './ServiceDetailPage';
import { commercialBuildingData } from '../_data/commercialBuilding.data';

export default function CommercialBuilding() {
    return <ServiceDetailPage data={commercialBuildingData} />;
}