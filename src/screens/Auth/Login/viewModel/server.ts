import {LoginCredentials, LoginResults, LoginViewModel} from "./interface";
import {useContext} from "react";
import {AuthContext} from "../../../../model/context/AuthContext";

export class ServerViewModel implements LoginViewModel {

  action(credentials: LoginCredentials): Promise<LoginResults> {
    const authContext = useContext(AuthContext)


  }
}
