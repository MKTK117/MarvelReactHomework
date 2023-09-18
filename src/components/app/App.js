import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SingleCharPage from "../pages/SingleCharPage";
import SingleComicPage from "../pages/SingleComicPage";
import SinglePage from "../pages/SinglePage";
import PlayPage from "../pages/PlayPage";
import AppHeader from "../appHeader/AppHeader";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));





const App =()=>{
        return (
            <Suspense fallback ={<span>Loading...</span>}>
                 <Router>
                    <div className="app">
                        <AppHeader/>
                        <main>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/comics" element={<ComicsPage/>}/>
                                <Route path="/comics/:id" element={<SinglePage component={SingleComicPage} dataType='comicId'/>}/>
                                <Route path="/characters/:id" element={<SinglePage component={SingleCharPage} dataType='characterId'/>}/>
                                <Route path="*" element={<Page404/>}/>
                                <Route path="/Play" element={<PlayPage/>}/>
                            </Routes>
                        </main>
                    </div>
                 </Router>
            </Suspense>
        )
}
export default App;

