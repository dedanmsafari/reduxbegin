//THIS WAS A SOLITARY TEST !!!
// // @ts-nocheck
// // @ts-ignore
// import {
//     addBug,
//     bugAdded
// } from '../bugs';
// // @ts-ignore
// import {
//     apiCallBegan
// } from '../api';



// // @ts-ignore
// describe('bugSlice', () => {
//     // @ts-ignore
//     describe('action Creators', () => {
//         // @ts-ignore
//         it('addBug', () => {
//             const bug = {
//                 description: 'a'
//             };
//             //run this;
//             const result = addBug(bug);
//             //what to expect.
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: './bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             };
//             // @ts-ignore
//             expect(result).toEqual(expected);
//         });

//     });

// });
//@ts-nocheck
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'
import {
    addBug,
    assignBugToUser,
    getUnresolvedBugs,
    getBugsByUser,
    resolveBug,
    loadBugs
} from '../bugs';
import confugureStore from '../confugureStore'


///-------------------------------------///

describe('bugsSlice', () => {
    let fakeAxios;
    let store;
    //-----------------
    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = confugureStore();


    })
    const bugsSlice = () => store.getState().entities.bugs;
    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    });

    describe('loading bugs', () => {
        describe('if the bugs exist in the cache', () => {
it('Should not be fetched from the server again', async() => {
    fakeAxios.onGet("/bugs").reply(200, [{ id: 1}]);
    
    await store.dispatch(loadBugs());
    await store.dispatch(loadBugs());

    expect(fakeAxios.history.get.length).toBe(1);
});


        });
            describe('if the bugs dont exist in the cache', () => {
                it('Should be fetched from the server and put in the store', async () => {
                    fakeAxios.onGet("/bugs").reply(200, [{ id: 1}]);

                    await store.dispatch(loadBugs());

                    expect(bugsSlice().list).toHaveLength(1);
                });
                
                describe('loading indicator', () => {
                    it('should be true while fetching the tests', () => {

                        fakeAxios.onGet("/bugs").reply(() => {
                            expect(bugsSlice().loading).toBe(true);
                            return [200, [{
                                id: 1
                            }]]
                        });
                        store.dispatch(loadBugs());
                    });

                    it('should be false after bugs are fetched', async () => {
                        fakeAxios.onGet("/bugs").reply(200, [{
                            id: 1
                        }]);
                        await store.dispatch(loadBugs());
                        expect(bugsSlice().loading).toBe(false);
                    });
                    it('should be false if there is a server problem', async () => {
                        fakeAxios.onGet("/bugs").reply(500);
                        await store.dispatch(loadBugs());
                        expect(bugsSlice().loading).toBe(false);
                    });

                });

            });


    });
    it('Should assign the bug  a userID  if it has been assigned to in the server', async () => {
        ///AAA
        fakeAxios.onPost("/bugs").reply(200, {
            id: 1
        });
        fakeAxios.onPatch("/bugs/1").reply(200, {
            id: 1,
            userId: 2
        })

        ///
        await store.dispatch(addBug({}));
        await store.dispatch(assignBugToUser( 1 , 2 ));

        expect(bugsSlice().list[0].userId).toBe(2);
    });
    

    // -----------------------
    it('Should mark the bug as resolved if it is saved to the server', async () => {

        ///
        fakeAxios.onPatch("/bugs/1").reply(200, {
            id: 1,
            resolved: true
        })
        fakeAxios.onPost("/bugs").reply(200, {
            id: 1
        });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugsSlice().list[0].resolved).toBe(true);
    });
    it('Should not mark the bug as resolved if it is has not been saved to the server', async () => {

        ///
        fakeAxios.onPatch("/bugs/1").reply(500)
        fakeAxios.onPost("/bugs").reply(200, {
            id: 1
        });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugsSlice().list[0].resolved).not.toBe(true);
    });


    //=====--=--------------------
    it('should add bug to the store if its saved to the server', async () => {
        //Use the triple AAA to write clean maintainable code
        // Arrange.- all initialisation code
        const bug = {
            description: 'a'
        };
        const savedBug = {
            ...bug,
            id: 1
        };
        fakeAxios.onPost('/bugs').reply(200, savedBug)

        // Act. - trigger an action
        await store.dispatch(addBug(bug));

        // Assert. -expectation code
        expect(bugsSlice().list).toContainEqual(savedBug);


    });
    it('should not add bug to the store if its not saved to the server', async () => {
        //Use the triple AAA to write clean maintainable code
        // Arrange.- all initialisation code
        const bug = {
            description: 'a'
        };
        // const savedBug = {...bug,  id: 1 };
        fakeAxios.onPost('/bugs').reply(500)

        // Act. - trigger an action
        await store.dispatch(addBug(bug));

        // Assert. -expectation code
        expect(bugsSlice().list).toHaveLength(0);


    });



    describe('Selectors', () => {
       

        ///failing test to be analyzed later
        it('getBugsByUser', () => {
            //AAA
            const state = createState();
          state.entities.bugs.list = [{
                id: 1,
                userId : 2
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ]
        const result = getBugsByUser(2)(state)
console.log(result);

        expect(result).toHaveLength(1);

        });
        
 
        it('getUnresolvedBugs', async () => {
            //Arrange
            // const unresolvedBug ={ description:"a", id: 1, resolved: false }
            // fakeAxios.onGet('/bugs').reply(200, unresolvedBug)
            const state = createState();
            state.entities.bugs.list = [{
                    id: 1,
                    resolved: true
                },
                {
                    id: 2
                },
                {
                    id: 3
                }
            ]
            //Act
            const result = getUnresolvedBugs(state);
            // await store.dispatch(resolveBug(1));

            //Assert
            expect(result).toHaveLength(2);


        });
    });

});