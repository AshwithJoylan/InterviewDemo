import 'react-redux';
import { ReduxState } from './State';
declare module 'react-redux' {
  interface DefaultRootState extends ReduxState {}
}
